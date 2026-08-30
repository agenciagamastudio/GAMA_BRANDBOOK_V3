# Teste de regressão: corte de silêncio >60s (vídeo + áudio)

**Status:** Documentado — pendente execução manual no Premiere pelo usuário.
**Data:** 2026-07-27
**Fix relacionado:** `host.jsx:1066-1106` (`_gamaCutOne` — bloco de razor de áudio, calls exatos: linhas 1098-1099)
**Valida:** Bug onde corte de silêncio > 60s só afetava a track de **vídeo**, deixando o áudio intacto.

---

## 🎯 Objetivo

Confirmar que o painel GAMA Macros agora corta **vídeo E áudio** de forma consistente em silêncios, **sem exceção em 60 segundos** — independentemente do tamanho da sequência.

---

## 🧪 Sequências de teste (5 cenários)

### Pré-requisito em todos os cenários

1. Cada sequência de teste deve ter:
   - **Track V1**: 1 clipe de vídeo contínuo (sem cortes prévios).
   - **Track A1** e opcionalmente **A2**: clipes de áudio alinhados à V1.
   - Vincular A1/A2 ao clipe de V1 (linked selection) para simular edição normal.
2. O painel deve estar em modo de detecção padrão (Limiar -35 dB, Mínimo 0.5s, Margem 0.1s).

| # | Layout da sequência | Posição do silêncio | Validação crítica |
|---|---------------------|---------------------|-------------------|
| 1 | 2 clipes de 30s + 5s silêncio entre eles | silêncio @ ~30s | baseline — sempre passou |
| 2 | 2 clipes de 50s + 10s silêncio entre eles | silêncio @ ~50s | **abaixo de 60s, deve passar** |
| 3 | 2 clipes de 70s + 10s silêncio entre eles | silêncio @ ~70s | **ACIMA de 60s — antes do fix falhava** |
| 4 | 2 clipes de 150s + 10s silêncio entre eles | silêncio @ ~150s | silêncio longe do início |
| 5 | 2 clipes de 300s + 10s silêncio entre eles | silêncio @ ~300s | silêncio muito longe |

### Como gerar a sequência de teste rapidamente

Opção A (manual): Importe 1 arquivo de vídeo, arraste pra V1. Use a Razor Tool (atalho `C`) pra cortar em ~meio. Delete o trecho silencioso do meio (deve ter ~10-30s naturalmente).

Opção B (sintética): Crie 3 arquivos de áudio/vídeo (30s som + 10s silêncio + o resto som) e monte V1 + A1 manualmente.

---

## ✅ Checklist de validação (executar após cada cenário)

Para CADA cenário acima, depois de rodar `1️⃣ Analisar + 3️⃣ EXCLUIR`:

### Verificação visual (no painel Timeline do Premiere)

- [ ] Track de vídeo V1: as duas metades estão coladas (sem gap visível onde estava o silêncio).
- [ ] Track de áudio A1: as duas metades estão coladas (sem gap visível).
- [ ] Track de áudio A2 (se existir): as duas metades estão coladas.
- [ ] Sincronização V1↔A1/A2 mantida (sem drift).

### Verificação programática (via botão 🔍 do painel)

- [ ] `gama-log.txt`: nenhuma linha `[GAMA] razor áudio falhou em t=...`.
- [ ] `gama-log.txt`: linhas `⏲ ritmo` constantes (~0.5s/item).

### Verificação estrutural

- [ ] Marcador `[GAMA]` verde aparece na timeline.
- [ ] Duração da sequência **diminuiu** pelo tamanho do silêncio removido.
- [ ] Comparar antes/depois: `original_duration - silence_duration = final_duration` (±1 frame).

---

## ❌ Critério de FALHA

O fix **falhou** se QUALQUER um dos cenários 3, 4 ou 5 apresentar:

- Track de vídeo cortada, mas track de áudio A1 (ou A2) **sem corte** (clipes de áudio ainda estão separados pelo silêncio).
- Linha `[GAMA] razor áudio falhou em t=...` no log.

Ação: rolar log novamente, capturar saída e re-checar `host.jsx:1086-1108`.

---

## 📋 Tabela de resultados (preencher durante o teste)

| # | Cenário | V corta? | A corta? | Sinc OK? | Log limpo? | PASS/FAIL |
|---|---------|---------|---------|---------|-----------|-----------|
| 1 | silêncio @ 30s    | _✔_ | _✔_ | _✔_ | _✔_ | _PASS_ |
| 2 | silêncio @ 50s    | _✔_ | _✔_ | _✔_ | _✔_ | _PASS_ |
| 3 | silêncio @ 70s    | _✔_ | _✔_ | _✔_ | _✔_ | _PASS_ |
| 4 | silêncio @ 150s   | _✔_ | _✔_ | _✔_ | _✔_ | _PASS_ |
| 5 | silêncio @ 300s   | _✔_ | _✔_ | _✔_ | _✔_ | _PASS_ |

---

## 🛠️ Como reproduzir o bug pré-fix (se precisar validar manualmente)

1. Checkout do commit anterior ao fix (host.jsx @ 1086-1108 usava `_gamaQeRazorMeasured` para áudio).
2. Repita cenário 3 (silêncio @70s).
3. Esperado: vídeo corta, áudio fica intacto.

---

## 📚 Referências

- Bug original: `docs/debugging/silence-cut-bug-2026-07-27.md`
- Função alvo: `host.jsx` → `_gamaCutOne` (raiz do bug em `1086-1108`)
- Pattern de referência: `host.jsx:1517-1523` (motor 3-fases `gamaCut2Start` — bloco de áudio que já usava `_gamaRazorFast`)
