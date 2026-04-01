# Design System

## Color palette

| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `#000000` | Page background |
| `--foreground` | `#ededed` | Primary text |
| `text-white/80` | `rgba(255,255,255,0.8)` | High-emphasis text |
| `text-white/50` | `rgba(255,255,255,0.5)` | Body text |
| `text-white/40` | `rgba(255,255,255,0.4)` | Secondary text |
| `text-white/30` | `rgba(255,255,255,0.3)` | Labels, muted text |
| `text-white/25` | `rgba(255,255,255,0.25)` | Tertiary text |
| `text-cyan-400` | Tailwind cyan-400 | Accent highlights (stats, keywords) |
| `border-white/[0.06]` | Very subtle white | Pill borders, dividers |

Dark-only design. No light mode.

## Typography

### Fonts
| Role | Font | Variable | CSS class |
|------|------|----------|-----------|
| Display / Headings | Playfair Display | `--font-display` | `font-display` |
| Body / UI | Inter | `--font-sans` | Default |
| Mono / Labels / Citations | JetBrains Mono | `--font-mono` | `font-mono` |

### Fluid type scale (320px → 1440px)
All sizes use `clamp()` — no breakpoints needed.

| Class | CSS Variable | Min | Max | Usage |
|-------|-------------|-----|-----|-------|
| `.fluid-hero` | `--text-hero` | 2.5rem | 4.5rem | Hero title |
| `.fluid-h1` | `--text-h1` | 2rem | 3.75rem | Section headings (large) |
| `.fluid-h2` | `--text-h2` | 1.6rem | 3rem | Section headings (standard) |
| `.fluid-stat` | `--text-stat` | 2.5rem | 4.5rem | Large stat numbers |
| `.fluid-stat-sm` | `--text-stat-sm` | 1.75rem | 2.5rem | Smaller stat numbers |
| `.fluid-sub` | `--text-sub` | 1.05rem | 1.5rem | Subtitles, secondary headings |
| `.fluid-body` | `--text-body` | 0.875rem | 1.05rem | Body copy |
| `.fluid-small` | `--text-small` | 0.75rem | 0.875rem | Fine print, stat labels |
| `.fluid-cta` | `--text-cta` | 1.1rem | 1.5rem | Button text |
| `.label` | `--text-label` | 0.6rem | 0.75rem | Uppercase labels (mono) |
| `.citation` | `--text-cite` | 0.55rem | 0.65rem | Source citations (mono) |

### Fluid spacing scale
| Class | CSS Variable | Min | Max |
|-------|-------------|-----|-----|
| `.mt-fluid-sm` | `--space-sm` | 0.75rem | 1.25rem |
| `.mt-fluid-md` | `--space-md` | 1rem | 2rem |
| `.my-fluid-sm` | `--space-sm` | 0.75rem | 1.25rem |
| `.gap-fluid-md` | `--space-md` | 1rem | 2rem |
| Section padding | `--space-section` | 1.25rem | 6rem |
| — | `--space-lg` | 1.5rem | 3rem |

## Layout

### Section structure
- Each section is `h-screen` with vertical flex centering
- CSS scroll snap: `scroll-snap-type: y mandatory` on `<html>`
- Content container: `max-w-2xl` (42rem)
- Sections alternate: center → left → right → left → right → left → center

### Section padding (responsive)
| Side | Mobile | Tablet (md) | Desktop (lg) |
|------|--------|-------------|--------------|
| Left-aligned | `pl-6 pr-6` | `pl-16 pr-12` | `pl-24 pr-12` |
| Right-aligned | `pr-6 pl-6` | `pr-16 pl-12` | `pr-24 pl-12` |
| Center | `px-6` | `px-12` | `px-12` |

### Progress dots
- Hidden on mobile (`hidden md:flex`)
- Fixed right: `right-4` (md), `right-6` (lg)
- Active dot: 8px white, inactive: 6px white/20

## Decorative elements

| Element | Class | Description |
|---------|-------|-------------|
| Thin gradient line | `.line-accent` | 1px horizontal divider, fades at edges |
| Text glow | `.text-glow` | Subtle white text-shadow for headings |
| Stat formatting | `.stat-number` | `tabular-nums`, tight letter-spacing |
| Scroll cue | Pulsing line | `animate-pulse` on a 1px gradient line in hero |

## Animation

### Stagger reveal
- Trigger: IntersectionObserver at 20% visibility
- Properties: `opacity: 0 → 1`, `translate3d(0, 18px, 0) → (0, 0, 0)`
- Duration: 700ms, cubic-bezier(0.25, 1, 0.5, 1)
- Stagger delay: 100ms between children (up to 8)
- GPU-only: `will-change: transform, opacity`
- Resets on scroll out (re-triggers on scroll back)

### Reduced motion
All animations and scroll snap disabled via `prefers-reduced-motion: reduce`.
