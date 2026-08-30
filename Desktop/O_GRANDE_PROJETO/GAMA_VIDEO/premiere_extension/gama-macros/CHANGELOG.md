# CHANGELOG — GAMA Macros

> Histórico de versões do painel CEP. PT-BR. Formato: [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/).

---

## [1.33.0] — 2026-08-30

### Adicionado
- **Namespace `GAMA`** no `jsx/host.jsx` (linhas 11–23): isola variáveis globais, padroniza retornos `{success, data, error, v}` e envolve chamadas QE DOM em `try/catch`.
- **Protocolo JSON CEP ↔ ExtendScript** documentado em `docs/protocolo-json-cep.md`.
- **Cache inteligente de waveform** (`js/main.js` linha 370): chave inclui `seq` + `mtime` do arquivo → invalida automaticamente se o arquivo for substituído (mesmo path).
- **Debounce de redimensionamento** (`js/main.js` ~linha 620): `scheduleWaveformUpdate` (250ms) evita múltiplos FFmpeg simultâneos ao redimensionar o painel.
- **Tokens GAMA DS V3** em `css/styles.css` (49 ocorrências de `--gama-*`): `--gama-color-*`, `--gama-font-*`, `--gama-radius-*`, `--gama-spacing-*`, `--gama-glass-blur`. Glassmorphism sutil nos painéis (`.section`).
- **Acessibilidade**: `aria-label` em 4 botões principais; `lang="pt-BR"` no `<html>`; meta `version=1.33.0`.
- **Registro de testes** em `docs/testes-fase-5.md` (7 cenários — manual pendente).

### Alterado
- **`_gamaFindClipAt` (`jsx/host.jsx`)**: regra de busca passou a usar **intersecção parcial** (`cs < e - 0.005 && ce > s + 0.005`) em vez de exigir 1 clipe cobrindo `[ax,bx]` inteiro. Corrige o bug "corte de silêncio >60s só vídeo" em clipes com A/V desvinculado.
- **`GAMA.ping` e `gamaVersion`**: agora retornam `{ success, data, v, protocol, lang }` em vez de string crua.
- **Manifest (`CSXS/manifest.xml`)**: versão bumped de 1.0.0 → 1.33.0.

### Correções (consolidação)
- Fix bug silêncio >60s com A/V desvinculado (movido para dentro do namespace GAMA, com captura `=== null` do razor).
- Buffer global ausente no CEP — `nodeRequire('buffer').Buffer` (já da v1.27, mantido).

### Pendente (Fase 5 — testes manuais)
- Cenários 1–7 do `docs/testes-fase-5.md` requerem Premiere Pro 23.6.8 aberto.
- Cenário 1 (silêncio >60s A/V desvinculado) tem fix estrutural aplicado; cenários 2–7 ainda não foram rodados nesta sessão.

---

## [1.27.0] — 2026-07-27 (anterior)

### Adicionado
- **Waveform real no preview** (FFmpeg PCM cru + canvas, 2 passos: flat → real).
- **Cache de waveform** por clipe (path + inP + outP + buckets).
- **Fix crítico do bug de silêncio >60s** (v1.25.1 + v1.25.2): captura de retorno do razor + validação `=== null`.

### Detalhes
- Ver `GAMA-MACROS-STATUS.md` para o histórico completo até v1.27.

---
**Mantido por:** @dev (Dex) · **Owner:** Orion (GAMA Studio) · **Idioma:** PT-BR
