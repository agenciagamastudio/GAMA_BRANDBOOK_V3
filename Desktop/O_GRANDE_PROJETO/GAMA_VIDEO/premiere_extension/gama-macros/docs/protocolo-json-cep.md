# Protocolo JSON CEP ↔ ExtendScript (v1.33.0)

> Padrão de comunicação entre o painel CEP (`js/main.js`) e o motor
> ExtendScript (`jsx/host.jsx`). PT-BR.

## Estrutura do retorno

Toda chamada `evalScript` retorna um objeto JSON (stringificado) com o formato:

```js
{
  success: true | false,
  data: <payload de retorno, opcional>,
  error: '<mensagem em PT-BR, opcional>',
  v: '1.33.0'
}
```

> **Compatibilidade legada**: a convenção `"OK:..."` / `"ERR:..."` (string) é
> aceita para funções já existentes; a transição para JSON é gradual e
> não quebra o painel.

## Funções padronizadas (v1.33.0)

| Função                  | Argumento           | Retorno                                  |
|-------------------------|---------------------|------------------------------------------|
| `GAMA.ping()`           | (nenhum)            | `{ success:true, data:'pong', v:'1.33' }`|
| `GAMA.version()`        | (nenhum)            | `{ success:true, v:'1.33.0', lang:'pt-BR'}`|
| `gamaPing()`            | (nenhum)            | `'pong'` (legado)                        |
| `gamaVersion()`         | (nenhum)            | `{ success:true, v:'1.33.0', … }`         |

## Padrão de payload (entrada)

O painel envia os parâmetros para o ExtendScript como **string JSON**
sempre que possível:

```js
csInterface.evalScript(
  'gamaFuncao(' + JSON.stringify(params) + ')',
  function (resultadoJSON) { … }
);
```

Limites: payload único < 1 MB (o Premiere pode truncar maior).

## Fila de operações (Fase 4)

Chamadas que modificam a timeline (`gamaCut2Step`, `gamaAddMarkers`,
`gamaBatchStep`) entram em uma **fila serial** implementada em
`main.js::evalScriptP` (lock + promessa sequencial). Evita condições
de corrida no QE DOM — duas operações simultâneas corrompem a timeline.

## Erros — formato

```json
{ "success": false, "error": "Mensagem em PT-BR", "v": "1.33.0" }
```

Todas as mensagens de erro são geradas em **português do Brasil** no
host.jsx. O painel exibe-as direto em `log` (CSS `.log-entry.error`).

## Versionamento

O campo `v` no retorno identifica a versão do protocolo. Mudanças
incompatíveis incrementam o major (ex: `1.34.0`).

---
**Mantido por:** @dev (Dex) · **Versão:** 1.33.0 · **Idioma:** PT-BR
