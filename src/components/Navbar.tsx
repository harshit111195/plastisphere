"use client";

import { useEffect, useState } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const hero = document.querySelector(".snap-section");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0.5 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => { document.documentElement.style.overflow = ""; };
  }, [menuOpen]);

  const navLinks = [
    { label: "Hub", href: "/hub" },
    { label: "About", href: "#about" },
    { label: "Research", href: "#research" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 lg:px-16 py-4 md:py-5 transition-all duration-500 ${
          scrolled ? "bg-black/80 backdrop-blur-sm" : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <a
          href="/"
          className="font-display fluid-nav tracking-[0.2em] uppercase text-white/90 hover:text-white transition-opacity"
        >
          Plastisphere
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-mono fluid-nav tracking-[0.15em] uppercase text-white/40 hover:text-white/70 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/hub"
            className="font-mono fluid-nav tracking-[0.1em] uppercase px-4 py-2 rounded-full border border-white/20 text-white/70 hover:border-cyan-400 hover:text-cyan-400 transition-all"
          >
            Explore the Hub
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden w-8 h-8 flex flex-col justify-center items-center gap-1.5"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={`block w-5 h-px bg-white transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-[3.5px]" : ""
            }`}
          />
          <span
            className={`block w-5 h-px bg-white transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-display fluid-h2 text-white/60 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/hub"
            onClick={() => setMenuOpen(false)}
            className="font-mono fluid-sub tracking-[0.1em] uppercase px-6 py-3 rounded-full border border-white/20 text-white/70 hover:border-cyan-400 hover:text-cyan-400 transition-all mt-4"
          >
            Explore the Hub
          </a>
        </div>
      )}
    </>
  );
}
