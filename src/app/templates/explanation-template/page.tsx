"use client";

import ExplanationPageLayout from "@/components/layout/ExplanationPageLayout";

export default function ExplanationTemplatePage() {
  const sections = [
    {
      icon: "🔍",
      title: "O que é?",
      content: (
        <p>
          Glassmorphism é um padrão de design moderno que simula vidro fosco usando
          backdrop blur e transparência.
        </p>
      ),
    },
    {
      icon: "⚙️",
      title: "Como Funciona?",
      content: (
        <p>
          O efeito é criado combinando CSS variables com blur, transparência e
          bordas sutis.
        </p>
      ),
    },
    {
      icon: "✨",
      title: "Quando Usar?",
      content: (
        <p>
          Ideal para cards, navegação flutuante, modais e qualquer elemento que
          precise destacar sem ser pesado.
        </p>
      ),
    },
  ];

  return (
    <ExplanationPageLayout
      title="O que é Glassmorphism"
      accentWord="Glassmorphism"
      subtitle="Um guia sobre o efeito visual que traz modernidade às interfaces."
      mainConcept="Glassmorphism cria elementos com aparência de vidro fosco usando backdrop blur e transparência."
      sections={sections}
      conclusion={
        <p>
          Glassmorphism é perfeito para criar interfaces modernas e elegantes
          quando usado com propósito.
        </p>
      }
    />
  );
}
