# Coding Best Practices

## Project-specific rules

### Do
- Use named exports (`export function Overlay()`, `export const ScrollVideo`)
- Add `"use client"` to any component with hooks, event handlers, or browser APIs
- Use fluid CSS utility classes (`fluid-hero`, `mt-fluid-sm`) instead of breakpoint-based sizing
- Keep animations GPU-only: `opacity` and `transform` only
- Use `IntersectionObserver` for scroll-triggered effects
- Cite every scientific statistic with DOI where available
- Test across mobile (375px), tablet (768px), and desktop (1280px+)

### Don't
- Use `filter: blur()` or non-compositable CSS in animations (causes jank)
- Add scroll event listeners for visual effects (use IntersectionObserver or ScrollTrigger)
- Use breakpoint-based font sizes (`text-3xl md:text-4xl`) — use fluid classes instead
- Use inline `style={{}}` for spacing — use `mt-fluid-sm` / `mt-fluid-md` utilities
- Use default exports (except `page.tsx` and `layout.tsx` which Next.js requires)
- Install dependencies without confirming they're needed
- Use the "credit card worth of plastic per week" statistic

## Component patterns

### Scroll sections
All content sections use the `ScrollSection` component in `Overlay.tsx`:
```tsx
<ScrollSection side="left">
  {/* children get stagger animation automatically */}
</ScrollSection>
```
Side options: `"center"` | `"left"` | `"right"`

### Citations
```tsx
<Citation text="Author et al. Year, Journal" doi="10.xxxx/xxxxx" />
```
DOI is optional. When provided, renders as a link to `https://doi.org/{doi}`.

## File organization
- `src/app/` — Pages and layouts (Next.js App Router)
- `src/components/` — Reusable UI components
- `src/app/globals.css` — Design tokens, utility classes, animations
- `public/` — Static assets (video, favicon)

## Performance checklist
- [ ] No layout-triggering animations (only `opacity` + `transform`)
- [ ] `will-change` set on animated elements
- [ ] `contain: layout paint` on scroll sections
- [ ] `prefers-reduced-motion` respected
- [ ] Images/video lazy-loaded or deferred where possible
- [ ] No unnecessary re-renders (stable refs, memoized callbacks)

## TypeScript
- Strict mode enabled
- Explicit types for component props
- Use `React.ReactNode` for children props
- Prefer interfaces for component props, type aliases for unions
