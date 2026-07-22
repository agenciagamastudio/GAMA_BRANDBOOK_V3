# GAMA Macros — Painel de Macros para Adobe Premiere Pro

Painel CEP com macros de ajuste **em massa** de clipes na timeline — sem passar pelo menu de contexto (que trava com centenas de clipes selecionados).

## Instalação

Já instalado em:
```
C:\Users\Usuario\AppData\Roaming\Adobe\CEP\extensions\com.gama.macros\
```

Pré-requisito (já configurado nesta máquina): `PlayerDebugMode = 1` em `HKCU\Software\Adobe\CSXS.11`.

**Abrir:** Premiere Pro → `Window → Extensions → GAMA Macros`
(em PT-BR: `Janela → Extensões → GAMA Macros`)

## Macros disponíveis (v1.3)

| Botão | O que faz | Alvo |
|-------|-----------|------|
| Ajustar ao quadro — SELECIONADOS | Redimensiona pra caber na tela (tenta QE nativo; se indisponível, calcula % pela resolução da mídia e seta no Motion) | Clipes selecionados |
| Ajustar ao quadro — TODOS | Idem, sequência inteira, **sem precisar selecionar** (2 cliques p/ confirmar) | Sequência inteira |
| Escala manual % | Seta um valor de escala fixo no Motion (50 = metade, 200 = dobro) | Clipes selecionados |
| 🔍 Diagnóstico | Grava `diag.txt` com relatório técnico (usar só em troubleshooting) | 1º clipe selecionado |

**Nota:** nesta máquina (Premiere 23.6.8) o comando QE `setScaleToFrameSize` falha — o painel detecta e usa automaticamente o método Motion (mesmo resultado visual), com cache de resolução por arquivo.

## Observações

- **Undo:** cada clipe processado gera 1 passo de desfazer (Ctrl+Z desfaz um por vez).
- **Sequências grandes:** o Premiere fica ocupado durante o processamento (a UI congela alguns segundos). É normal — aguarde a mensagem de conclusão no log.
- **"Definir p/ tamanho do quadro"**: se o clipe já estiver com "Escala para o tamanho do quadro" ativado, o resultado visual pode dobrar o ajuste. Use um ou outro.
- Grafismos/títulos podem não suportar `setScaleToFrameSize` — são contados como "falharam" no log e o lote continua.

## Troubleshooting

**Painel não aparece no menu Extensions:**
1. Confirmar que a pasta está em `%APPDATA%\Adobe\CEP\extensions\com.gama.macros` com o `CSXS\manifest.xml`
2. Confirmar `PlayerDebugMode = 1` (string) em `HKCU\Software\Adobe\CSXS.11`
3. Fechar o Premiere COMPLETAMENTE e reabrir

**Botão retorna "EvalScript error":**
- Erro de ExtendScript no host.jsx. Para depurar, criar o arquivo `.debug` na pasta da extensão com conteúdo:
  ```xml
  <ExtensionList>
    <Extension Id="com.gama.macros.panel">
      <HostList>
        <Host Name="PPRO" Port="7788"/>
      </HostList>
    </Extension>
  </ExtensionList>
  ```
  e abrir `http://localhost:7788` no Chrome com o painel aberto.

**"QE DOM não encontrou a sequência":**
- Clique uma vez na timeline (para garantir que a sequência está ativa) e tente de novo.

## Arquitetura

```
com.gama.macros/
├── CSXS/manifest.xml    # registro CEP (host PPRO, CSXS 11)
├── index.html           # UI do painel
├── css/styles.css
├── js/CSInterface.js    # shim mínimo (evalScript + getExtensionPath)
├── js/main.js           # lógica do painel (Promise wrapper + log)
└── jsx/host.jsx         # ExtendScript ES3 — motor das macros
```

Ideias futuras: cortar silêncios (integração com servidor GAMA_VIDEO), presets de macros, normalização de áudio.

---
GAMA Studio — v1.0.0 (2026-07-07)
