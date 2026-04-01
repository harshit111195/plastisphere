"use client";

import { useEffect, useRef } from "react";

type Side = "center" | "left" | "right";

function ScrollSection({
  children,
  side = "center",
}: {
  children: React.ReactNode;
  side?: Side;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
        } else {
          el.classList.remove("is-visible");
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const horizontal =
    side === "left"
      ? "items-start text-left pl-6 md:pl-16 lg:pl-24 pr-6 md:pr-12"
      : side === "right"
        ? "items-end text-right pr-6 md:pr-16 lg:pr-24 pl-6 md:pl-12"
        : "items-center text-center px-6 md:px-12";

  return (
    <section
      className={`h-screen w-full flex flex-col justify-center snap-section ${horizontal}`}
    >
      <div
        ref={ref}
        className="max-w-2xl stagger-children"
      >
        {children}
      </div>
    </section>
  );
}

function Citation({ text, doi }: { text: string; doi?: string }) {
  return (
    <p className="citation mt-fluid-sm">
      {doi ? (
        <a
          href={`https://doi.org/${doi}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-70 transition-opacity"
        >
          {text}
        </a>
      ) : (
        text
      )}
    </p>
  );
}

export function Overlay() {
  return (
    <div className="relative z-10">

      {/* ── Section 1: Hero — CENTER ── */}
      <ScrollSection side="center">
        <h1 className="font-display text-glow fluid-hero font-black tracking-[-0.03em] leading-none">
          PLASTISPHERE
        </h1>
        <div className="line-accent w-24 mx-auto mt-fluid-sm" />
        <p className="label text-white/40 mt-fluid-sm">
          Global Microplastics Research Hub
        </p>
        <div className="flex justify-center mt-fluid-md">
          <div className="w-px h-16 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
        </div>
      </ScrollSection>

      {/* ── Section 2: Scale Stats — LEFT ── */}
      <ScrollSection side="left">
        <p className="label text-white/30">Since the 1950s</p>
        <h2 className="font-display text-glow stat-number fluid-stat font-black leading-none mt-fluid-sm">
          8.3 billion
        </h2>
        <p className="fluid-sub text-white/50 font-light leading-relaxed mt-fluid-sm">
          metric tonnes of plastic produced
        </p>
        <div className="line-accent w-12 my-fluid-sm" />
        <p className="fluid-h2 font-semibold text-white/80 leading-snug">
          Less than <span className="text-cyan-400">9%</span> has ever
          <br />
          been recycled.
        </p>
        <Citation
          text="Geyer et al. 2017, Science Advances"
          doi="10.1126/sciadv.1700782"
        />
      </ScrollSection>

      {/* ── Section 3: Persistence — RIGHT ── */}
      <ScrollSection side="right">
        <h2 className="font-display text-glow fluid-h2 font-bold leading-tight">
          Plastic never disappears.
          <span className="text-white/40 font-light italic"> It just gets smaller.</span>
        </h2>
        <div className="flex justify-end gap-fluid-md mt-fluid-sm">
          <div className="text-right">
            <p className="stat-number fluid-stat-sm font-black text-cyan-400 leading-none">
              ~8M
            </p>
            <p className="text-white/40 fluid-small leading-snug mt-1">
              tonnes/yr into oceans
            </p>
          </div>
          <div className="text-right">
            <p className="stat-number fluid-stat-sm font-black text-cyan-400 leading-none">
              450 yrs
            </p>
            <p className="text-white/40 fluid-small leading-snug mt-1">
              bottle persistence
            </p>
          </div>
        </div>
        <Citation
          text="Jambeck et al. 2015, Science"
          doi="10.1126/science.1260352"
        />
      </ScrollSection>

      {/* ── Section 4: Microplastics in Humans — LEFT ── */}
      <ScrollSection side="left">
        <p className="label text-white/30">Particles smaller than 5 mm</p>
        <h2 className="font-display text-glow fluid-h2 font-bold leading-tight mt-fluid-sm">
          Found in your food,
          <br />
          water, air, and
          <br />
          <span className="text-cyan-400">blood</span>.
        </h2>
        <p className="fluid-body text-white/40 font-light max-w-md leading-relaxed mt-fluid-sm">
          Microplastics have been detected in human blood, lungs, placentas,
          and breast milk.
        </p>
        <div className="flex flex-wrap gap-2 mt-fluid-sm">
          {["Blood", "Lungs", "Placenta", "Breast milk"].map((organ) => (
            <span
              key={organ}
              className="px-3 py-1 rounded-full border border-white/[0.06] text-white/30 fluid-small label"
            >
              {organ}
            </span>
          ))}
        </div>
        <Citation text="Leslie et al. 2022 · Ragusa et al. 2021 · Jenner et al. 2022" />
      </ScrollSection>

      {/* ── Section 5: Nanoplastics — RIGHT ── */}
      <ScrollSection side="right">
        <h2 className="font-display text-glow fluid-h1 font-black leading-[0.92]">
          Nano
          <br />
          plastics.
        </h2>
        <p className="fluid-sub text-white/30 font-light italic mt-fluid-sm">
          Invisible to the naked eye.
        </p>
        <div className="line-accent w-12 ml-auto my-fluid-sm" />
        <p className="fluid-body text-white/50 font-light max-w-sm ml-auto leading-relaxed">
          Detected in human brain tissue — at concentrations significantly
          higher than in the liver or kidneys.
        </p>
        <p className="fluid-small text-white/25 font-light max-w-sm ml-auto leading-relaxed mt-2">
          Concentrations in the brain appear to be increasing over recent
          decades.
        </p>
        <Citation text="Campen et al. 2024/2025, Nature Medicine" />
      </ScrollSection>

      {/* ── Section 6: Research — LEFT ── */}
      <ScrollSection side="left">
        <h2 className="font-display text-glow fluid-h2 font-bold leading-tight">
          Scientists across
          <br />
          the globe are racing
          <br />
          to understand.
        </h2>
        <div className="line-accent w-12 my-fluid-sm" />
        <p className="fluid-body text-white/35 font-light max-w-md leading-relaxed">
          Microplastics and nanoplastics are among the most actively
          researched environmental contaminants of the 21st century.
        </p>
      </ScrollSection>

      {/* ── Section 7: CTA — CENTER ── */}
      <ScrollSection side="center">
        <p className="font-display fluid-sub text-white/50 font-light leading-relaxed">
          We track global microplastics research
          <br />
          so you don&apos;t have to.
        </p>
        <a
          href="/hub"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-semibold fluid-cta tracking-tight hover:bg-white/90 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] active:scale-95 mt-fluid-md"
        >
          Explore the Hub
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </a>
      </ScrollSection>
    </div>
  );
}
