# GAMA Macros — Status & Continuação

> **Gatilho:** quando o usuário disser "continuar com o GAMA Macros", leia ESTE arquivo inteiro antes de qualquer coisa. Ele é a memória do projeto.

**Última sessão:** 2026-08-30 | **Versão:** painel v1.33.0 / host.jsx 1.33.0 / manifest 1.33.0
**Última mudança (v1.33.0 — 2026-08-30):**
- Namespace `GAMA` (`jsx/host.jsx`): isola variáveis globais, padroniza retornos `{success, data, error, v}`.
- `_gamaFindClipAt`: intersecção parcial (`cs < e - 0.005 && ce > s + 0.005`) — fix bug silêncio >60s com A/V desvinculado consolidado dentro do namespace.
- `waveformCache` (`js/main.js`): chave inteligente (`path|inP|outP|buckets|seq|mtime`) + `scheduleWaveformUpdate` (debounce 250ms).
- `styles.css`: tokens `--gama-*` (GAMA DS V3) aplicados; `backdrop-filter` nos painéis.
- `manifest.xml`: versão 1.33.0; `index.html`: meta `version` + `lang="pt-BR"` + `aria-label`.
- Protocolo JSON: `docs/protocolo-json-cep.md` (padrão `{success, data?, error?, v}` para `evalScript`).
- `CHANGELOG.md` criado; `docs/testes-fase-5.md` criado (7 cenários, manual pendente — requer Premiere Pro 23.6.8 + painel aberto).
- Nenhum `git push` executado (autoridade exclusiva @devops conforme `agent-authority.md`).

**Status atual:** Fases 1–4 COMPLETAS | Fase 5 (testes) PENDENTE MANUAL (requer Premiere) | Fase 6 (deploy/ZXP) só após testes PASS.
**Repositório GitHub (próprio, privado):** https://github.com/agenciagamastudio/Gama_Macro (branch `main`) — extraído via `git subtree split --prefix="Desktop/O_GRANDE_PROJETO/GAMA_VIDEO/premiere_extension"` a partir do repo-monorepo da home; **fluxo de push:** rodar `git subtree split` de novo a cada sessão (gera branch temporário), `git push gama-macro <branch>:main`, depois apagar o branch temporário local (`git branch -D`) — mesmo padrão já usado no GAMA_VOZ.
**Fonte oficial (este repo):** `premiere_extension/gama-macros/`
**Instalado (deploy) em:** `%APPDATA%\Adobe\CEP\extensions\com.gama.macros\`
**Instalar/atualizar deploy:** rodar `premiere_extension/install.ps1`
**Abrir no Premiere:** Window → Extensions → GAMA Macros (Premiere Pro 2023 v23.6.8, CEP 11)

---

## O que é

Painel CEP para Premiere Pro com macros de edição em massa. Nasceu porque selecionar centenas de clipes + botão direito crashava o Premiere. Evoluiu para automação completa do fluxo de edição do usuário: **vídeos gravados com "apontador humano"** (pessoa A lê a linha do roteiro fora de câmera, pessoa B repete na câmera — sobra apontador, takes errados e silêncio pra remover).

## Recursos e status

| Recurso | Status | Nota |
|---|---|---|
| 📐 Ajustar ao tamanho do quadro (selecionados/todos) | ✅ 100% validado | 3127 clipes em produção; via Motion/Scale (QE setScaleToFrameSize é quebrado) |
| 🔢 Escala manual % | ✅ 100% validado | |
| ✂️ Remover silêncios | ✅ 100% validado (v1.25.1 corrige falha V- only em silêncios >60s) | FFmpeg silencedetect por janelas usadas na timeline |
| 👁️ Preview ao vivo (fica/corta) | ✅ v1.26 confirmado funcionando no Premiere | Barra de resumo único abaixo de Limiar/Mín/Margem, atualiza sozinha (debounce 700ms) ao digitar. Só leitura — não mexe em cutPlan/botões 2️⃣3️⃣. Reaproveita cache de `detectSilences` (mudar só a Margem é grátis, não reprocessa FFmpeg) |
| 🌊 Waveform real no preview | 🆕 v1.27, NÃO testado no Premiere ainda | Canvas em vez de barra de blocos: decodifica PCM cru via FFmpeg (`extractWaveformPeaks`, mono 3000Hz, downsample em picos por bucket) e desenha a onda de verdade, colorida verde/vermelho. Desenho em 2 passos: `drawFlatBar` instantâneo (cor sólida, feedback na hora) → `updateSilWaveform` assíncrono redesenha por cima com a forma real assim que decodifica (progressivo, não trava a UI). Cache por clipe (`waveformCache`, chave path+inP+outP+buckets) — só decodifica 1x por seleção; mudar Limiar/Mín/Margem depois reaproveita e só recolore. Ver "PRIMEIRA COISA A FAZER" abaixo |
| 🎬 Roteiro & repetições | ✅ validado em 61min real | Transcreve (Groq Whisper), acha falas consecutivas com texto ≥70% igual, marca todas menos a ÚLTIMA (remove apontador + takes ruins). 55 achados de qualidade |
| ⚡ Analisar TUDO | ✅ | Silêncios + Roteiro num clique, planos se somam |
| 3️⃣ EXCLUIR (motor de corte) | ✅ funcional | **Validação end-to-end:** 61m08s → 46m18s (−14m50s, 571 cortes) — mas na v1.24 levou 28min + 24min de verificador; **v1.25 (instalada, NÃO testada ainda) deve fazer em ~5-10min flat** |
| 🧠 Vícios de fala (éé/ãã) | ❌ PARQUEADO | Whisper limpa muletas da transcrição → sem base confiável em PT-BR (repos: CrisperWhisper é EN/DE). Código ficou em main.js (inativo). Ideia futura: "som sem palavra transcrita" = hesitação |

## PRIMEIRA COISA A FAZER na próxima sessão

**1. Validar a v1.33.0 no Premiere (refatoração completa, Fases 1–4 aplicadas, testes manuais pendentes):**
1. Abrir o painel, confirmar que o título mostra "GAMA Macros v1.33.0".
2. Selecionar clipes com áudio e rodar o cenário 1 do `docs/testes-fase-5.md` (silêncio >60s com A/V desvinculado) — esperado: áudio E vídeo cortados em sincronia.
3. Rodar cenário 4 (waveform em clipe 30min+) — esperado: canvas sem freeze; mudar Margem → recolorir instantâneo (cache de `waveformCache`); redimensionar painel → sem travamento (debounce 250ms).
4. Conferir tokens GAMA DS V3 aplicados (cores `--gama-color-primary` = ciano, superfície escura, glassmorphism sutil nas seções).
5. Se algo falhar: ler `gama-log.txt` (pasta CEP deployada) + console do painel (F12 no CEP) → corrigir (`jsx/host.jsx` ou `js/main.js`) → re-testar.

**2. Após todos os 7 cenários PASS:** `@devops` autoriza o fluxo de push (subtree split → `Gama_Macro:main`).

**2. Validar a v1.25 em lote grande** (a correção definitiva de performance ainda não foi medida):
1. Usuário roda ⚡ + 3️⃣ num bruto grande → observar linhas `⏲ ritmo` no log
2. **Esperado:** ritmo CONSTANTE (~0.5s/item) nas duas fases, fim limpo sem travamento silencioso
3. Se degradar de novo → ler `gama-log.txt` (na pasta CEP deployada) e investigar; plano B esboçado: rota XML (exportAsFinalCutProXML → transformar → importar)

Depois: sync-back da pasta CEP pra cá se houver mudanças, empacotamento ZXP (distribuição sem debug mode), e absorver features do pipeline GAMA_VIDEO (legendas/transcrição) como botões.

## Arquitetura (resumo)

```
index.html + css/          UI (PT-BR, dark, seções por recurso)
js/CSInterface.js          shim mínimo (evalScript + getExtensionPath)
js/main.js                 lógica: análises (FFmpeg/Groq via Node), plano de cortes
                           {t,a,b,k('s'|'a'|'r'),why}, runner 3️⃣, progresso/cancelar,
                           log em tela + gama-log.txt (Claude lê!);
                           preview ao vivo (renderSilPreview/previewSilences,
                           debounce 700ms nos 3 campos, coalescido — nunca 2
                           ffmpeg de preview rodando junto)
jsx/host.jsx               ExtendScript ES3: razor medido, exclusão medida,
                           motor gamaCut2* (fatiar+excluir por trecho, desc,
                           fase final une buracos medidos), marcadores [GAMA],
                           diagnósticos (gamaDiag → diag.txt)
```

- **Detecção silêncio:** `ffmpeg -ss w0 -i arquivo -t len -vn -af silencedetect` só nos trechos usados na timeline (janelas mescladas por arquivo); cache por janela+params.
- **Transcrição:** Groq `whisper-large-v3` (chave auto-lida dos .env de GAMA_AUDIOTRANSCRIBER/GAMA_VOZ, ambas válidas) em pedaços de 600s (limite 25MB); word timestamps; Node https (fetch do CEP tem CORS).
- **Corte:** plano coalescido (sobreposições fundidas POR TRACK, eps 0.08) → desc por `a` → por trecho: razor medido b,a (vídeo+áudio que cruza) → remove SEM ripple (`remove(0,0)` = 'dom00' forçado) → fase final mede buracos reais (snapshot em memória) e move cada clipe 1x pra posição final.
- **Groq LLM** (`llama-3.3-70b-versatile`) só era usado no 🧠 parqueado.

## ⚠️ Os 13 GOTCHAS descobertos (NÃO recair!)

1. **PlayerDebugMode DEVE ser String (REG_SZ)** — DWord = CEP ignora silenciosamente, menu Extensions cinza. Checar TIPO: `(Get-Item $k).GetValueKind('PlayerDebugMode')`.
2. **manifest.xml:** sem xmlns default 2011 (parser não reconhece) e sem `<PreferredSize>` (usar `<Size>`). Copiar formato do Motion Factory.
3. **QE `setScaleToFrameSize()` falha** ("Not Enough Parameters" no 23.6.8) → usar Motion/Scale via DOM (`matchName 'AE.ADBE Motion'`, prop Scale, `setValue(v, true)`); % = min(seqW/clipW, seqH/clipH)×100; resolução via `getProjectMetadata()` → Column.Intrinsic.VideoInfo.
4. **QE `rippleDelete()` é NO-OP silencioso** — executa sem erro e não faz nada. NUNCA confiar em chamada sem erro: **medir sempre** (track encolheu? pedaço sumiu?).
5. **`remove(1,0)` remove mas ripple flag é ignorada** em algumas condições; `remove(0,0)` = lift (buraco fica) — comportamento VARIA por sessão → medir.
6. **Timecode NTSC:** razor via timecode pode desviar; solução = **razor MEDIDO** (comparar bordas antes/depois, usar posição REAL; borda existente a ≤1.5 frame = reaproveitar). `razor(número)` = "Illegal Parameter type" (só string).
7. **Intervalos SOBREPOSTOS corrompem corte desc** (silêncio+IA marcam a mesma região) → `coalescePlan()` funde antes de todo corte.
8. **`seq.clone()` pode tornar a CÓPIA ativa** → cortes iriam pra cópia invisível. Capturar IDs antes/depois, renomear backup, reativar original (`app.project.activeSequence = seq`). Prova no log: duração antes→depois.
9. **Whisper LIMPA muletas** (éé/ãã) da transcrição — prompt "transcrição literal" ajuda pouco; não construir detecção de vícios sobre o texto. E regex de muleta NUNCA pode casar "e"/"é" isolados (conjunção/verbo!).
10. **O(n²) #1:** varrer a track inteira por corte (property reads são RPC ~ms) → busca binária (`_gamaClipIdxNear`, track.clips é ordenada).
11. **Groq 413:** áudio >25MB → transcrever em pedaços de 600s.
12. **O(n²) #2:** fases separadas inflavam a track (fatiar tudo antes de excluir) → fatiar+excluir POR TRECHO.
13. **O(n²) #3 (o pior):** exclusão COM ripple = Premiere desloca internamente todos os clipes seguintes a cada remoção → remover sem ripple + unir tudo numa passada final medida.

**Regra de ouro destilada:** *nenhum efeito de API do Premiere é confiável entre versões/sessões — sempre medir o resultado real e adaptar.*

## Utilitários de debug

- `gama-log.txt` (pasta CEP) — espelho de tudo que o painel loga; Claude lê direto.
- Botão 🔍 → `diag.txt` (capacidades QE/DOM + sonda de corte com 1 clipe selecionado).
- `roteiro-report.txt` — transcrição + veredito MANTÉM/REMOVE por fala.
- Marcadores `[GAMA]` na timeline (verde, com duração) — auditoria visual; 🧹 limpa.

## Contexto de produto

- Usuário: editor GAMA Studio, visual/concreto, prefere exemplos antes de termos técnicos.
- Este painel é **extra oficial do GAMA_VIDEO** (decisão 2026-07-07). A extensão antiga `com.gamavideotools` está aposentada (nunca funcionou — gotchas 1+2).
- Distribuição p/ terceiros no futuro: empacotar ZXP assinado (ZXPSignCmd + cert self-signed).
