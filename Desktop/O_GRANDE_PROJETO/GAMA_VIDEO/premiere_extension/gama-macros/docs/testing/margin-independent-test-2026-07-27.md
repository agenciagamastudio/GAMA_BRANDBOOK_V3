# Teste manual — margens independentes (pre/post-roll)

**Data:** 2026-07-27
**Escopo:** Painel CEP GAMA Macros — seção "✂️ Remover silêncios"
**Versão do painel:** v1.28

## O que mudou

Antes existia **UM** controle "Margem" aplicado igual no início e no fim do corte.
Agora existem **DOIS** controles independentes:

| Campo (HTML id)      | Rótulo         | Default | Efeito                                                |
|----------------------|----------------|---------|-------------------------------------------------------|
| `silPadStart`        | Margem início  | 0.10 s  | Quanto **preservar ANTES** do início do silêncio       |
| `silPadEnd`          | Margem fim     | 0.20 s  | Quanto **preservar DEPOIS** do fim do silêncio         |

Cada borda é tratada de forma independente — pode (e deve!) serem diferentes.

## Espelhamento amigável (auto-mirror)

A primeira vez que o usuário mexe no campo **início**, o campo **fim** segue junto
(mesma experiência do controle único antigo). Isso é registrado pelo atributo
`data-touched="1"` no campo fim. A partir daí os dois ficam independentes até o
reload do painel.

- Digitar 0.5 no início → fim também vai a 0.5 (se fim nunca foi tocado)
- Digitar 0.7 no fim → fim fica em 0.7; `data-touched="1"`; as bordas se separam.
- Recarregar o painel (Ctrl+R dentro do painel CEP) reseta o espelhamento.

## Como reproduzir o teste (silêncio de ~30s)

### Material

- 1 clipe na timeline com **pelo menos 30 s de áudio** entre duas falas reais
  (pode gravar 10 s de fala, depois 30 s de silêncio com barulho de fundo bem
  baixo, depois 10 s de fala. Funciona também com um trecho de podcast já
  editado).
- Velocidade do clipe = 100% (sem time-remap ou time-stretch).

### Sequência

1. Selecione o clipe na timeline (clique simples).
2. Abra o painel **GAMA Macros → ✂️ Remover silêncios**.
3. Ajuste:
   - Limiar: `-40` dB
   - Mín.: `0.8` s
   - Margem início: `0.10` s
   - Margem fim: `0.30` s
4. Observe o preview (barra verde/vermelho). Confirme que a região vermelha
   (vai cortar) começa **0.10 s DEPOIS** da primeira queda abaixo do limiar e
   termina **0.30 s ANTES** da subida do áudio.
5. Espere a waveform real carregar para inspeção fina.
6. Clique **1️⃣ Analisar SÓ os silêncios**.
7. Clique **2️⃣ Corte de TESTE (só 1 silêncio)**.

### Critério de aceitação

Verifique no Premiere (dando play na região) que:

- O início do corte fica **0.10 s** após a última sílaba falada do trecho anterior.
- O fim do corte fica **0.30 s** antes da próxima sílaba falada.
- A fala não "começa seca" (respiro do início preserve) e nem é "cortada
  abrupta" (respiro do fim preserve).

### Cenários adicionais

| Início | Fim   | O que você vê                                           |
|--------|-------|---------------------------------------------------------|
| 0.10   | 0.10  | Margem igual dos dois lados — comportamento legado      |
| 0.10   | 0.30  | Início agressivo, fim conservativo — uso recomendado    |
| 0.30   | 0.10  | Início conservativo (preserva rabo da fala), fim seco   |
| 0.00   | 0.00  | Sem margem — corte vai até o último dB abaixo do limiar |

### Diagnóstico

`🔍` (botão no header do painel) gera um `diag.txt` com os valores exatos
lidos do formulário, incluindo as margens independentes. Bom para confirmar
em sessões de debug.

## Não regressão

Este recurso mexe **somente** nos arquivos do painel (`index.html` + `js/main.js`).
O motor de corte em `jsx/host.jsx` **não foi tocado** — ele continua recebendo
o plano `[t, a, b]` já com as bordas ajustadas pelas margens (mesma matemática
de antes, só que o `a` agora usa `+ padStart` e o `b` usa `- padEnd` em vez de
um único `± pad`). Compatibilidade com v1.25/v1.26/v1.27 preservada.

Validação rápida (`1️⃣` + `2️⃣` em silêncio curto) deve dar o mesmo resultado
que a versão antiga quando início = fim.
