# Design Brief

## Direction

Circuito — portal de Engenharia Eletrônica para Patrício Mateus da Luz; estética técnica premium inspirada em placa de circuito (PCB) com trilhas, pads e vias como motivos decorativos.

## Tone

Tecnológico e moderno com intensidade controlada de showcase — superfícies profundas de Azul Meia-Noite, acentos de Verde Placa de Circuito e detalhes Laranja/Dourado, executado com precisão de engenharia.

## Differentiation

Motivos de trilhas de circuito (trace-grid) e pads animados como assinatura visual — o site parece um PCB vivo, não um template corporativo genérico.

## Color Palette

| Token      | OKLCH (dark)  | OKLCH (light) | Role                          |
| ---------- | ------------- | ------------- | ----------------------------- |
| background | 0.14 0.02 265 | 0.985 0.006 265 | Azul Meia-Noite / claro       |
| foreground | 0.94 0.015 265| 0.2 0.03 265  | Texto principal               |
| card       | 0.18 0.022 265| 1.0 0.002 265 | Superfícies elevadas          |
| primary    | 0.72 0.14 150 | 0.38 0.09 265 | Verde Placa de Circuito / CTA |
| accent     | 0.78 0.13 75  | 0.68 0.12 75  | Laranja/Dourado — destaques   |
| muted      | 0.22 0.02 265 | 0.94 0.01 265 | Fundos secundários            |
| border     | 0.28 0.025 265| 0.9 0.01 265  | Bordas / divisores            |

## Typography

- Display: Space Grotesk — títulos, hero, números técnicos
- Body: General Sans — parágrafos, UI, documentação
- Mono: JetBrains Mono — código, especificações, dados técnicos
- Scale: hero `text-5xl md:text-7xl font-bold tracking-tight`, h2 `text-3xl md:text-5xl font-bold tracking-tight`, label `text-sm font-semibold tracking-widest uppercase`, body `text-base lg:text-lg`

## Elevation & Depth

Hierarquia de superfícies via card/popover elevados com sombras `shadow-subtle`/`shadow-elevated`; profundidade por camadas, bordas e textura trace-grid, sem gradientes de página inteira.

## Structural Zones

| Zone    | Background          | Border   | Notes                                  |
| ------- | ------------------- | -------- | -------------------------------------- |
| Header  | bg-card             | border-b | fixo, elevado, logo + nav + CTA        |
| Content | bg-background       | —        | alterna bg-muted/30 a cada seção       |
| Footer  | bg-muted/40         | border-t | legal (© 2026 Patrício Mateus da Luz)  |

## Spacing & Rhythm

Seções com `py-24 md:py-32`, grade de conteúdo `gap-8`; micro-espaçamento 4/8px para densidade técnica, 16/24px para agrupamento.

## Component Patterns

- Buttons: `rounded-md`, primary = Verde Placa de Circuito, hover eleva + gradient-primary; accent = Laranja/Dourado para destaques
- Cards: `rounded-lg`, bg-card, `shadow-subtle` repouso e `shadow-elevated` hover
- Badges: `rounded-full`, pill, borda tracejada tipo via de PCB, accent/primary conforme status

## Motion

- Entrance: `animate-fade-up` 0.5s com stagger em seções
- Hover: `transition-smooth` 0.3s — elevação de card, cor de botão
- Decorative: `animate-trace-flow` em trilhas SVG, `animate-pulse-dot` em pads de status

## Constraints

- Tema claro/escuro com `darkMode: class`; AA+ em ambos
- Tokens OKLCH exclusivamente; sem literais de cor em componentes
- Todos os textos em português (Brasil)
- Preservar meta tags SEO de index.html

## Signature Detail

Padrão trace-grid de trilhas de circuito + pads pulsantes como fundo decorativo em hero e seções — o portal lê como uma placa de circuito viva.
