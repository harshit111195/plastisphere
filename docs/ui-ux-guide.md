# UI/UX Guide

## Design philosophy
Cinematic, editorial storytelling. Think Apple product pages meets National Geographic. Dark, immersive, minimal UI — the content and visuals do the work. Every interaction should feel smooth and intentional.

## Core principles

### 1. Immersion first
- Full-black background with no visible chrome
- Video fills the entire viewport behind text
- UI elements (dots, buttons) appear only when needed
- No header/footer on the landing page

### 2. Progressive disclosure
- Information revealed one section at a time via scroll
- Each section focuses on a single idea or statistic
- Stagger animation draws the eye through content hierarchy
- Scroll snap ensures each section gets full attention

### 3. Scientific credibility
- Every claim is backed by peer-reviewed research
- Citations visible but unobtrusive (small, muted, mono font)
- DOI links allow instant verification
- No sensationalism — let the numbers speak

### 4. Effortless navigation
- Scroll snap gently guides users between sections
- Keyboard support (Arrow Up/Down) for accessibility
- Progress dots (desktop) show position and allow jumping
- No hamburger menus or complex navigation on the landing page

## Visual hierarchy (per section)

```
1. Label / context tag     (smallest, mono, muted — anchors the topic)
2. Headline / stat         (largest, display serif — the hook)
3. Supporting text         (medium, sans, semi-muted — elaboration)
4. Tags / decorative       (small, contained — visual texture)
5. Citation                (smallest, mono, very muted — credibility)
```

## Interaction patterns

### Scroll behavior
- Snap to section centers (`scroll-snap-type: y mandatory`)
- Video scrubs with scroll progress (GSAP ScrollTrigger)
- Content fades in when section enters viewport (20% threshold)
- Content fades out when section leaves viewport (re-triggers on return)

### Hover states
- Links: opacity reduction (70%)
- CTA button: slight scale (1.03), soft glow shadow, smooth transition
- Progress dots: opacity increase on inactive dots
- All transitions: 300ms duration

### Touch / mobile
- Scroll snap works natively on touch devices
- Progress dots hidden (too small to tap reliably)
- Section padding ensures thumb-safe margins
- No hover-dependent interactions

## Accessibility

### Motion sensitivity
- `prefers-reduced-motion: reduce` disables:
  - All stagger animations
  - Scroll snap behavior
  - Pulse animation on scroll cue
- Content remains fully readable without animation

### Keyboard navigation
- Arrow Up/Down moves between sections
- Tab navigation works for links and buttons
- Progress dots are focusable buttons with aria-labels

### Color contrast
- Primary text (#ededed on #000000) = 18.1:1 ratio (AAA)
- Body text (white/50) = ~8:1 ratio (AAA)
- Muted text (white/30) = decorative only, not essential content
- Cyan accent on black = high contrast

## Responsive strategy

| Viewport | Key adaptations |
|----------|----------------|
| Mobile (<768px) | Progress dots hidden, symmetric padding (24px), fluid type at minimum sizes |
| Tablet (768-1279px) | Dots visible, increased side padding, type scales up |
| Desktop (1280px+) | Full layout, generous asymmetric padding, type at maximum sizes |

No layout shifts between breakpoints — only padding and font size scale via `clamp()`.

## Content tone
- Direct and factual, not alarmist
- Short sentences, high information density
- Numbers and visuals over paragraphs
- Scientific but accessible to general audience
