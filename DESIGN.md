# Design Brief

## Direction

Dark Editorial Clarity — A minimalist, high-trust verification tool for fake news detection with semantic color-coded verdicts.

## Tone

Contemporary and authoritative. Clean, focused interface that conveys credibility and precision — like Linear or Vercel's minimalism.

## Differentiation

Semantic color-coding (green=REAL, amber=UNCERTAIN, red=FAKE) paired with numeric confidence scores creates instant visual + data trust signal.

## Color Palette

| Token       | OKLCH          | Role                          |
| ----------- | -------------- | ----------------------------- |
| background  | 0.145 0.014 260 | Dark neutral base (light mode: 0.99 0.005 260) |
| foreground  | 0.95 0.01 260  | Text/primary content          |
| card        | 0.18 0.014 260 | Card surfaces (light: 1.0 0 0) |
| primary     | 0.75 0.15 190  | CTA, accents (cyan/teal)      |
| destructive | 0.55 0.22 25   | FAKE verdict                  |
| success     | 0.65 0.18 145  | REAL verdict                  |
| warning     | 0.75 0.15 85   | UNCERTAIN verdict             |

## Typography

- Display: Space Grotesk — Hero title, verdict headings, section labels
- Body: DM Sans — Form labels, descriptions, confidence text
- Scale: hero `text-4xl md:text-6xl font-bold tracking-tight`, verdict `text-2xl font-bold`, body `text-base`

## Elevation & Depth

Cards elevated with subtle shadow (shadow-md). Header and footer have minimal `border-b`/`border-t`. Alternate content sections with `bg-background` and `bg-muted/20` for rhythm.

## Structural Zones

| Zone    | Background     | Border        | Notes                                  |
| ------- | -------------- | ------------- | -------------------------------------- |
| Header  | bg-background  | border-b      | Subtle separator, minimal padding      |
| Content | bg-background  | —             | Main form area, spacious padding       |
| Result  | semantic color | —             | Card elevated with color-coded bg      |
| History | bg-muted/20    | border-t      | Alternating section, compact list      |

## Spacing & Rhythm

Spacious gaps between sections (gap-8 to gap-12). Form inputs use standard padding (px-4 py-3). Result card elevated with visible shadow. History items compact (py-2) with micro-gaps.

## Component Patterns

- Buttons: Primary action uses primary color (cyan), hover darkens slightly. Submit button full-width on form.
- Cards: bg-card with `rounded-lg`, shadow-md. Result cards use semantic backgrounds (green/amber/red).
- Badges: Confidence score as numeric label (e.g., "92% confident").

## Motion

- Entrance: Form result slides in from bottom via `translateY` + fade, 0.3s ease-out.
- Hover: Buttons and history items use `transition-smooth` (0.3s ease). Subtle scale lift on hover.
- Decorative: Loading spinner on submit, pulsing while API calls.

## Constraints

- No gradients or decorative flourishes — pure functional design.
- Verdict color always paired with numeric confidence (no color alone).
- History section scrollable on mobile, max-height 400px.

## Signature Detail

Semantic color verdicts (traffic light metaphor) with numeric confidence scores embedded in result card header — trustworthy, instant, data-driven.
