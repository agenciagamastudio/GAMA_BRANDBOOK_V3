# 📖 Explanation Template Guide

**Status:** READY TO USE
**Location:** `src/components/layout/ExplanationPageLayout.tsx`
**Example Page:** `/templates/explanation-template`

---

## 🎯 O que é?

Um **template padrão reutilizável** para criar páginas de explicação educativa com design consistente do Design System V3.

Toda vez que você pedir para Claude criar um HTML explicativo:
- Leia este guia
- Use o componente `ExplanationPageLayout`
- Customize com seus dados
- Pronto! Padrão garantido

---

## 📋 Estrutura do Template

O layout tem 5 seções principais:

### 1. **Header** (Obrigatório)
- Título (com opção de destacar uma palavra em gradiente)
- Subtítulo (contexto do tópico)

### 2. **Conceito Principal** (Opcional)
- Caixa destacada com vidro fosco
- Para explicar a ideia central

### 3. **Seções** (Obrigatório)
- Múltiplas seções com título + conteúdo
- Cada seção pode ter ícone emoji
- Separadas por linhas sutil

### 4. **Conclusão** (Opcional)
- Resumo final em caixa vidro fosco
- Chama para ação ou próximo passo

### 5. **Design**
- Glassmorphism (vidro fosco + sombra)
- Cores do Design System V3
- Dark/Light mode automático
- Responsivo

---

## 🚀 Como Usar

### Passo 1: Import o Layout

```jsx
import ExplanationPageLayout from "@/components/layout/ExplanationPageLayout";
```

### Passo 2: Estruture seus Dados

```jsx
const props = {
  title: "O que é TypeScript?",              // ✅ obrigatório
  accentWord: "TypeScript",                  // opcional: qual palavra destacar
  subtitle: "Um guia completo sobre...",     // opcional
  mainConcept: "TypeScript é um...",         // opcional
  sections: [
    {
      icon: "📝",                            // opcional
      title: "O que é?",
      content: <div>Explicação aqui...</div>
    },
    // ... mais seções
  ],
  conclusion: <div>Resumo final...</div>     // opcional
};
```

### Passo 3: Renderize

```jsx
"use client";
import ExplanationPageLayout from "@/components/layout/ExplanationPageLayout";

export default function MyExplanationPage() {
  return <ExplanationPageLayout {...props} />;
}
```

---

## 📝 Props Detalhadas

| Prop | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| `title` | string | ✅ SIM | Título principal da página |
| `accentWord` | string | ❌ Não | Palavra para destacar em gradiente |
| `subtitle` | string | ❌ Não | Subtítulo/contexto |
| `mainConcept` | ReactNode | ❌ Não | Caixa com conceito central |
| `sections` | Section[] | ✅ SIM | Array de seções |
| `conclusion` | ReactNode | ❌ Não | Resumo final |

### Tipo `Section`

```typescript
interface Section {
  title: string;      // ✅ obrigatório
  content: ReactNode; // ✅ obrigatório
  icon?: string;      // ❌ opcional (emoji)
}
```

---

## 💡 Exemplo Completo

```jsx
"use client";
import ExplanationPageLayout from "@/components/layout/ExplanationPageLayout";

export default function ReactHooksPage() {
  return (
    <ExplanationPageLayout
      title="React Hooks: Simplificando State Management"
      accentWord="Hooks"
      subtitle="Aprenda como usar useState, useEffect e custom hooks para criar componentes mais limpos."
      mainConcept="Hooks são funções que 'se conectam' ao React, permitindo usar state em componentes funcionais sem necessidade de classes."
      sections={[
        {
          icon: "🎣",
          title: "O que são Hooks?",
          content: (
            <div>
              <p>Hooks são funções especiais que:</p>
              <ul>
                <li>Permitem usar state em componentes funcionais</li>
                <li>Simplificam lógica complexa</li>
                <li>Tornam código mais reutilizável</li>
              </ul>
            </div>
          ),
        },
        {
          icon: "⚙️",
          title: "Hooks Principais",
          content: (
            <div>
              <p><strong>useState:</strong> Gerencia estado local</p>
              <p><strong>useEffect:</strong> Executa efeitos colaterais</p>
              <p><strong>useContext:</strong> Acessa contexto</p>
            </div>
          ),
        },
      ]}
      conclusion={
        <p>
          Hooks revolucionaram a forma de escrever React. Domine os 3 principais
          e você consegue 90% dos casos de uso.
        </p>
      }
    />
  );
}
```

---

## 🎨 Customização

### Mudar Cores

As cores vêm de CSS variables em `globals.css`. Para mudar:

```css
/* globals.css */
:root {
  --color-text: #ffffff;
  --color-text-secondary: #a0a0a0;
  --color-primary: #88ce11;
  --glass-surface: rgba(255, 255, 255, 0.08);
}
```

Nenhuma mudança no componente — automático!

### Mudar Layout

Se quiser espaçamento diferente, seções em grid, etc:

1. Copie `ExplanationPageLayout.tsx`
2. Renomeie para `ExplanationPageLayoutVariant.tsx`
3. Customize os estilos
4. Importe no lugar certo

### Adicionar Interatividade

```jsx
"use client";
import { useState } from "react";

export default function InteractiveExplanation() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <ExplanationPageLayout
      sections={sections.map((section, idx) => ({
        ...section,
        content: expanded === idx ? section.content : "...",
      }))}
    />
  );
}
```

---

## 🔗 Integração com Navegação

Para que a página apareça no menu, adicione em `src/components/layout/Sidebar.tsx`:

```jsx
{
  icon: "📖",
  label: "Explanation Template",
  href: "/templates/explanation-template",
  description: "Template padrão para páginas educativas"
}
```

---

## ✨ Boas Práticas

### DO ✅
- Use ícones emoji para cada seção (visual)
- Mantenha seções concisas (2-4 parágrafos cada)
- Termine com conclusão clara
- Use código em `<pre>` para exemplos
- Teste em dark mode

### DON'T ❌
- Não misture muitas cores (use tokens CSS)
- Não use hardcoded valores de tamanho/espaçamento
- Não adicione muitos efeitos de animação
- Não deixe sem ícones (fica visual chato)
- Não esqueça do `"use client"` se tiver interatividade

---

## 📱 Responsividade

O template é automáticamente responsivo:
- Desktop: 960px max-width
- Tablet: ajusta padding
- Mobile: full width com padding

Nenhuma media query necessária!

---

## 🧪 Testando

```bash
# Start dev server
npm run dev

# Abra no navegador
http://localhost:3001/templates/explanation-template

# Teste:
# ✅ Dark mode (toggle no Sidebar)
# ✅ Light mode
# ✅ Mobile (redimensione janela)
# ✅ Hover effects
```

---

## 🐛 Troubleshooting

### Página em branco?
- Verifique se tem `"use client"` no topo
- Verifique import do componente
- Verifique se `sections` tem pelo menos 1 item

### Estilos não aplicam?
- Limpe `.next/` — `rm -rf .next && npm run build`
- Reinicie dev server
- Verifique se `globals.css` foi modificado

### Cores estranhas?
- Verifique tema (dark/light) no toggle
- Verifique CSS variables em `globals.css`
- Verifique contraste com `--color-text`

---

## 📚 Próximos Passos

1. **Use em novos projetos** — Template é reutilizável
2. **Customize se precisar** — Crie variantes
3. **Documente padrões** — Mantenha este guia atualizado
4. **Feedback** — Melhore com feedback de usuários

---

## 🎓 Referências

- **Componente:** `src/components/layout/ExplanationPageLayout.tsx`
- **Exemplo:** `src/app/templates/explanation-template/page.tsx`
- **Design System:** `/foundations/effects`
- **CSS Variables:** `src/app/globals.css`

---

**Criado:** 2026-05-31  
**Status:** ✅ PRODUCTION READY  
**Versão:** 1.0
