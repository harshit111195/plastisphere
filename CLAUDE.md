# Plastisphere — Claude Code Project Guide

## What is this?
A cinematic, scroll-driven landing page for a global microplastics research hub. Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and GSAP. The background is a pinned fullscreen video scrubbed by scroll progress. Text overlays are arranged in 7 full-height snap sections with staggered reveal animations.

## Architecture
```
src/
  app/
    layout.tsx      — Root layout, Google Fonts (Inter, Playfair Display, JetBrains Mono), OG meta
    page.tsx        — Home page: GSAP ScrollTrigger video scrub, keyboard nav (Arrow Up/Down)
    globals.css     — Fluid type scale, fluid spacing, stagger animations, scroll snap
  components/
    Navbar.tsx      — Fixed top nav, transparent→opaque on scroll, mobile hamburger menu
    Footer.tsx      — Full-height snap section with brand, links, social icons, copyright
    ScrollVideo.tsx — Pinned <video> with placeholder fallback (no video file yet)
    Overlay.tsx     — 7 scroll sections with alternating L/R/Center alignment
    ProgressDots.tsx— Fixed right-side nav dots (hidden on mobile, dynamic count)
public/
    video/          — Empty. Expects hero.mp4 (AI-generated, scroll-scrubbed)
    favicon.svg     — "P" monogram
```

## Key conventions

### Scientific accuracy
- Every statistic MUST have a citation with DOI link where available
- NEVER use the "credit card worth of plastic per week" claim (retracted/disputed)
- Citations use the `Citation` component in Overlay.tsx

### Fluid design system
- All typography uses CSS `clamp()` via custom properties (`--text-hero` through `--text-cite`)
- All spacing uses fluid utilities: `mt-fluid-sm`, `mt-fluid-md`, `my-fluid-sm`, `gap-fluid-md`
- No breakpoint-based font sizing — everything scales 320px to 1440px+
- See `docs/design-system.md` for the full scale

### Performance rules
- Animations: GPU-only (`opacity` + `translate3d`). No `blur`, no `filter`, no `scale` in stagger animations
- `will-change: transform, opacity` on animated elements
- `contain: layout paint` on snap sections
- `prefers-reduced-motion` disables all animations and scroll snap
- Intersection Observer for reveal triggers (not scroll listeners)

### Code style
- Functional components only, hooks for state/effects
- `"use client"` directive on all interactive components
- Named exports preferred (no default exports except page/layout)
- Tailwind utilities + custom CSS classes from globals.css
- Inline styles only when truly dynamic — prefer CSS utility classes

## Commands
```bash
npm run dev      # Start dev server (port 3000)
npm run build    # Production build
npm run lint     # ESLint
```

## Dependencies
- **gsap** — ScrollTrigger for video scrubbing
- **tailwindcss** — Utility-first styling
- **next** / **react** / **react-dom** — Framework

No other runtime dependencies. R3F/Three.js were removed (original 3D approach replaced by video).

## Roadmap
- [ ] Generate AI video (hero.mp4) for scroll background
- [ ] Build /hub page (research feed with AI-generated summaries)
- [ ] Add paper search, filtering, and DOI-linked cards
