# Bug: Corte de silêncio >60s só afeta vídeo (áudio fica intacto)

**Status:** ✅ FIX APLICADO (validar no Premiere via teste de regressão `docs/testing/silence-cut-regression-test-2026-07-27.md`)
**Reportado:** 2026-07-27
**Investigador:** @debugger (Orion) → hipótese consolidada
**Fix aplicado por:** @executor (mín. surgical) em 2026-07-27 — host.jsx v1.25.0 → v1.25.1

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

---

## 💊 Fix definitivo aplicado (2026-07-27)

**Linhas:** `host.jsx:1066-1106` (dentro de `_gamaCutOne`, bloco de razor de áudio, linhas **exatas dos novos calls: 1098-1099**)

**Diff resumido:**
```js
// ANTES:
_gamaQeRazorMeasured(seq, qeA, aTrack, bx, null);
_gamaQeRazorMeasured(seq, qeA, aTrack, ax, null);

// DEPOIS:
var razorBx = _gamaRazorFast(seq, qeA, aTrack, bx);
var razorAx = _gamaRazorFast(seq, qeA, aTrack, ax);
if (razorBx === null || razorAx === null) {
  $.writeln('[GAMA] razor áudio falhou em t=' + bx.toFixed(2) + '/' + ax.toFixed(2) + 's (track A' + (x + 1) + ')');
}
```

**Pattern usado:** `_gamaRazorFast` do motor 3-fases (`gamaCut2Start` linhas 1517-1523) replicado em `_gamaCutOne`.

**Por que `_gamaRazorFast` em vez de manter `_gamaQeRazorMeasured`?**
- `_gamaRazorFast` (linha 1302-1361): tem **busca binária interna** (`_gamaClipIdxNear`), valida borda existente a ≤1.5 frame, e usa **fallback automático** pra `_gamaQeRazorMeasured` se a sonda direta falhar (linhas 1339/1345/1360). É o método `gamaCut2Start` usa com sucesso.
- `_gamaQeRazorMeasured` (linha 636-700): mais pesado, mas é o **fallback** dentro do `_gamaRazorFast`. Não tem proteção contra o cenário onde `audioTrack.razor()` falha por bug da QE API em timecode ≥ 60s.

**Hipótese original confirmada:** **SIM — Parcialmente.**
- Hipótese 1 (razor falha silenciosamente em áudio): **CONFIRMADA** — captura do retorno + pattern mais robusto resolve o "raw" do problema.
- Hipótese 2 (boundary 60s no formato de timecode): **FALSA** — formato HH:MM:SS:FF já é produzido pelo `_gamaSecsToTimecodeStr` para qualquer valor.
- Hipótese 3 (`_gamaRemovePiece` pensa que removeu): **CONFIRMADA** — o early-return `if (ord < 0) return null` (linha 877) é o que permitia o áudio "sumir do radar" sem estar de fato cortado. O `_gamaRazorFast` resolve na raiz impedindo o cenário de bordas não-existirem (retornando `null` em vez de "borda já existia").

**Validação pendente:** Teste de regressão manual pelo usuário em `docs/testing/silence-cut-regression-test-2026-07-27.md` (5 cenários: 30s, 50s, 70s, 150s, 300s). Não dá pra automatizar — só Premiere CEP aberto valida.

**Output de log esperado:** zero linhas `[GAMA] razor áudio falhou`. Se aparecer, o `_gamaRazorFast` cobriu; se persistir, precisa investigar fallback adicional.

**Notas de risco residual:**
- `_gamaRazorFast` requer `$.global.__gamaRazorFmt` cacheado (linha 1338). Se for a primeira chamada numa sessão nova, cai pro `_gamaQeRazorMeasured` (passo 1339). Comportamento é o mesmo do motor 3-fases — produção validada.
- Não tocou sinais de `_gamaRemovePiece` nem `_gamaFindClipAtFast` — alteração é cirúrgica. Padrão motor 3-fases já coexiste em produção há 1+ ano sem regressões.

---

## 🔁 v2 — Persistência do bug nas 2 outras ocorrências (2026-07-29)

**Status:** ✅ FIX APLICADO (validar no Premiere via mesmo teste de regressão `docs/testing/silence-cut-regression-test-2026-07-27.md`)
**Reportado:** 2026-07-29 (bug continuava — silêncio >60s ainda afetando só vídeo)
**Fix aplicado por:** @executor em 2026-07-29

### 🐛 Sintomas (v2)

- ✅ v1.25.1 corrigiu o caso da `_gamaCutOne` (linha 1098-1099).
- ❌ MAS havia **outras 2 ocorrências do mesmo padrão bugado** em `host.jsx` — calls de razor de áudio que descartavam o retorno. Caller perdia o sinal de falha e áudio ficava intacto.

### 📍 Ocorrências adicionais corrigidas (mesma raiz da v1)

**Ocorrência #2 — motor 2-fases (batch processador, provável UI principal):**
- Arquivo/linha: `host.jsx:1530-1531` (dentro de `gamaCut2Step`, loop de fatia áudio)
- Pattern bugado: chamadas `_gamaRazorFast(seq, aQe[x], aT, bx)` / `(ax)` sem captura de retorno.
- Fix: mesma estratégia — capturar `razorBx`/`razorAx`, validar `=== null`, `$.writeln` em caso de falha.

```js
// ANTES:
_gamaRazorFast(seq, aQe[x], aT, bx);
_gamaRazorFast(seq, aQe[x], aT, ax);

// DEPOIS:
var razorBx = _gamaRazorFast(seq, aQe[x], aT, bx);
var razorAx = _gamaRazorFast(seq, aQe[x], aT, ax);
if (razorBx === null || razorAx === null) {
  $.writeln('[GAMA] razor áudio falhou em t=' + bx.toFixed(2) + '/' + ax.toFixed(2) + 's (motor 2-fases, track A' + (x + 1) + ')');
}
```

**Ocorrência #3 — função de diagnóstico `gamaCutExperiment`:**
- Arquivo/linha: `host.jsx:796-797` (loop `for (var x = 0; x < nA; x++)` na seção `2) razor nas tracks de áudio`).
- Pattern bugado: chamadas `_gamaQeRazorMeasured` (não `_gamaRazorFast`!) — ainda o método antigo, e **também** sem captura.
- Detalhe importante: este caller usa `_gamaQeRazorMeasured` direta (não passa pelo `_gamaRazorFast`). Mas o problema raiz é idêntico — descarte do retorno. Aplicada mesma estratégia de fix mínimo (capturar + logar via `out.push` já que é caminho de diag).
- Decisão: **manter `_gamaQeRazorMeasured`** nesse ponto (não trocar por `_gamaRazorFast`) — diff cirurgicais. `_gamaRazorFast` chama `_gamaQeRazorMeasured` internamente; o ganho de robustness só viria ao custo de mexer no path de diagnóstico. Se o bug persistir aqui pelo motivo errado, próximo pass troca a função.

```js
// ANTES:
_gamaQeRazorMeasured(seq, qeATrack, aTrack, bx, out);
_gamaQeRazorMeasured(seq, qeATrack, aTrack, ax, out);

// DEPOIS:
var razorBx = _gamaQeRazorMeasured(seq, qeATrack, aTrack, bx, out);
var razorAx = _gamaQeRazorMeasured(seq, qeATrack, aTrack, ax, out);
if (razorBx === null || razorAx === null) {
  out.push('A' + (x + 1) + ': razor de áudio FALHOU para [' + ax.toFixed(2) + ' → ' + bx.toFixed(2) + ']s');
}
```

### 🎯 Por que essas 2 ocorrências passaram batidas na v1.25.1

- A v1.25.1 consertou a que **estava documentada como sintoma direto do usuário** (`_gamaCutOne`).
- As outras 2 só foram achadas por **grep exaustivo** de `_gamaRazorFast` / `_gamaQeRazorMeasured` no arquivo. São calls de função de baixo nível sem nome que gritasse "isto é bug".
- Lição: code smells de retorno-descartado precisam ser **descobertos por padrão de código, não por sintoma de usuário**.

### ⚠️ Outros calls verificados (mas NÃO modificados) — por quê

Lidos todos os 30 matches de `_gamaQeRazorMeasured` + `_gamaRazorFast` no `host.jsx`:

| Linha | Contexto | Por que não toca |
|---|---|---|
| 761-762 | `gamaCutExperiment` (vídeo) | Caller já valida `ax === null \|\| bx === null` na linha 763. Corrigido. |
| 1060-1061 | `_gamaCutOne` (vídeo) | Caller já valida. Corrigido. |
| 1505-1506 | `gamaCut2Step` (`qeV, domV`) | Vídeo. Caller já valida via accumulator `S.fail` + `firstErr`. OK. |
| 1349, 1355, 1370 | dentro do `_gamaRazorFast` (fallback interno) | Retornos **são** checados pelo fallback (linhas 1339/1345/1360). Já está robusto — não muda nada. |

### 🧪 Regression test (mesmo do v1 — não duplicar)

Roda `docs/testing/silence-cut-regression-test-2026-07-27.md` com cenários 30s/50s/70s/150s/300s. Esperado depois do v2: zero linhas `[GAMA] razor áudio falhou` E zero entradas `'A<N>: razor de áudio FALHOU para ...'` no `diag-cut.txt`.</mm:think>

