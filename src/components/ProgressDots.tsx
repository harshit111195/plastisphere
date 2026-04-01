"use client";

import { useEffect, useState } from "react";

export function ProgressDots() {
  const [active, setActive] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const sections = document.querySelectorAll(".snap-section");
    setCount(sections.length);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(sections).indexOf(entry.target as Element);
            if (index >= 0) setActive(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (index: number) => {
    const sections = document.querySelectorAll(".snap-section");
    sections[index]?.scrollIntoView({ behavior: "smooth" });
  };

  if (count === 0) return null;

  return (
    <nav
      className="fixed top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col right-4 lg:right-6 gap-3"
      aria-label="Scroll progress"
    >
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => scrollTo(i)}
          aria-label={`Go to section ${i + 1}`}
          className="group relative w-3 h-3 flex items-center justify-center"
        >
          <span
            className={`block rounded-full transition-all duration-300 ${
              i === active
                ? "w-2 h-2 bg-white"
                : "w-1.5 h-1.5 bg-white/20 group-hover:bg-white/40"
            }`}
          />
        </button>
      ))}
    </nav>
  );
}
