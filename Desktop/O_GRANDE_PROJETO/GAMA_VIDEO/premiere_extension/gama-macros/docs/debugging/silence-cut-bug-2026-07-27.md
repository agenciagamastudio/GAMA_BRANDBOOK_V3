# Bug: Corte de silêncio >60s só afeta vídeo (áudio fica intacto)

**Status:** Root cause candidate identified (validar com @dev antes de aplicar)
**Reportado:** 2026-07-27
**Investigador:** @debugger (Orion) → hipótese consolidada

---

## 🐛 Sintomas

- ✅ Detecção de silêncio funciona (encontra pontos corretos no áudio)
- ✅ Corte em silêncio **<= 60s** corta VÍDEO + ÁUDIO corretamente
- ❌ Corte em silêncio **> 60s** corta SÓ VÍDEO. Áudio fica intacto

## 🔍 Boundary crítico

**60 segundos = `00:01:00:00` em SMPTE timecode.** Acima disso, formato muda de `MM:SS:FF` pra `HH:MM:SS:FF`.

## 🎯 Causa-Raiz Candidata (não validada)

### Local: `host.jsx` ~linha 1091-1092 (função `_gamaCutOne`)

> **STATUS ATUAL (2026-07-27) — hipótese #2 (boundary 60s no formato) INVALIDADA por leitura estática.** Ver bloco "Achados da validação" no fim.

```js
_gamaQeRazorMeasured(seq, qeA, aTrack, bx, null);
_gamaQeRazorMeasured(seq, qeA, aTrack, ax, null);
```

**Problemas combinados:**

1. **Retorno descartado** — `qeRazorMeasured` pode retornar `null` (falha silenciosa). Caller ignora.

2. **Timecode format boundary em 60s** — quando `secs >= 60`, o formato esperado pelo Premiere DOM muda. Se `_gamaSecsToTimecodeStr(seq, t>=60, ':')` ainda retorna formato `MM:SS:FF` ao invés de `HH:MM:SS:FF`, o razor falha no DOM do Premiere.

3. **`_gamaRemovePiece` "pensa" que removeu** — `line 877`: quando `_gamaFindClipAt()` não encontra nada (porque audio razor não cortou), retorna "already gone" sem erro. Mas **o áudio continua intacto no DOM** porque o razor nunca cortou.

## 🔬 Hipóteses auxiliares (em ordem)

1. **Hipótese principal:** `qeRazorMeasured` falha silenciosamente em timecode `> 60s` para tracks de áudio
2. **Hipótese secundária:** Timecode conversion bug em `_gamaSecsToTimecodeStr` (formato errado em boundary 60s)
3. **Hipótese terciária:** `_gamaRemovePiece` deveria validar que o clip FOI removido, não só "está gone"

## 💊 Fix Proposto (NÃO APLICADO — @dev valida)

### Bloco 1: Validar retorno do razor e tratar falha

```js
// Antes
_gamaQeRazorMeasured(seq, qeA, aTrack, bx, null);
_gamaQeRazorMeasured(seq, qeA, aTrack, ax, null);

// Depois — captura retorno, valida, retry com outro formato
var razorOk1 = _gamaQeRazorMeasured(seq, qeA, aTrack, bx, null);
if (!razorOk1) {
  // tenta formato HH:MM:SS:FF explícito
  razorOk1 = _gamaQeRazorMeasured(seq, qeA, aTrack, bx, 'hms');
}
```

### Bloco 2: Validar remoção efetiva em `_gamaRemovePiece`

```js
// Se _gamaFindClipAt retorna -1, NÃO é "already gone" —
// provavelmente razor falhou. Marca como FAILED.
```

## 🧪 Teste de regressão sugerido

1. Criar sequência de teste: 3 clipes de 30s cada + 5s silêncio entre eles = total 100s+
2. Rodar corte de silêncio
3. **Verificar (no Premiere)**: áudio dos clipes 2 e 3 devem avançar 5s cada (cortes de silêncio aplicados)
4. **Repetir com sequências de 30s, 60s, 120s, 300s** — comportamento deve ser consistente

Edge cases críticos:
- Silêncio exatamente em 60s
- Múltiplos silêncios em uma sequência > 120s
- Áudio com clipes editados no meio (markers artificiais)

## 📚 Achados colaterais

- **Outro ponto suspeito:** `host.jsx:562-563` — conversão de timecode para NTSC frame rates. Pode ter bug similar.
- **Code smell geral:** `_gamaQeRazorMeasured` retorna `null` em falha → callers não validam → bugs silenciosos.

## ✅ Próximo passo

`@dev` (Dex) valida hipótese in-loco, aplica fix mínimo, adiciona teste de regressão manual documentado. NÃO push — só `@devops` autoriza.

---

**Validado por:** _(pendente @dev)_
**Fix aplicado:** _(pendente)_
**Teste passou:** _(pendente)_

---

## 🔬 Achados da validação estática (2026-07-27)

Validação feita por análise estática do código-fonte (sem Premiere aberto).

### Hipótese 2 (boundary 60s no formato de timecode): **FALSA**
- `host.jsx:553-571` (`_gamaSecsToTimecodeStr`) **sempre** produz formato `HH:MM:SS:FF` (com `hh` = `'00'` quando <3600s).
- Logo a mudança de formato `MM:SS:FF → HH:MM:SS:FF` em `secs >= 60` **não acontece** nessa base de código.
- Sintoma do usuário pode ter outra raiz: QE API bug em `audioTrack.razor()` para timecode ≥60s, independente do formato.

### Hipótese 1 (razor falha silenciosamente em áudio) e Hipótese 3 (removePiece acha "já sumiu"): **PARCIALMENTE CONFIRMADAS**
- `host.jsx:1091-1092` realmente descarta retorno do razor.
- `host.jsx:845-877` (`_gamaRemovePiece`) tem o early-return `if (ord < 0) return null` ("já sumiu") quando `_gamaFindClipAtFast` (linha 838, exige `[s,e]` exato ±0.005s) não acha match porque o clipe de áudio SEM razor cobre muito além de `[ax,bx]`.
- Esse caminho resulta em "removeu ✔" reportado, mas áudio intacto na track. Vídeo corta, áudio não.

### Assimetria com vídeo: **CONFIRMADA**
- `host.jsx:1060-1064` (vídeo) valida `ax === null || bx === null` e aborta.
- `host.jsx:1091-1092` (áudio) não valida — único ponto onde o pipeline inteiro fica silencioso.

### Como reproduzir a falha real
- O fix do doc (Bloco 1 + retry com formato HH:MM:SS:FF) **não** corrigiria o bug — formato HH já é o que está saindo. O fix corretor é replicar o padrão `_gamaRazorFast` (linha 1495/1520 do motor 3-fases, que JÁ trata áudio com validação local) no caminho da `_gamaCutOne` (linha 1051).
- Antes de aplicar: rodar com Premiere aberto e capturar `gama-log.txt` confirmando se o razor de áudio retorna `null` OU se cria borda desalinhada (`e1 ≈ t mas ≠ t`). A diferença decide entre captura+retry vs substituição direta pelo `_gamaRazorFast`.

### Localização correta dos arquivos
- `GAMA_MACROS/premiere_extension/` listado pelo usuário está VAZIO (só este doc). A casa real é `GAMA_VIDEO/premiere_extension/gama-macros/` (atualizado 2026-07-08 conforme `GAMA_VIDEO/CLAUDE.md`). Bug encontrado no caminho real, não no que o usuário listou.
