"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollVideo } from "@/components/ScrollVideo";
import { Overlay } from "@/components/Overlay";
import { Footer } from "@/components/Footer";
import { ProgressDots } from "@/components/ProgressDots";
import { Navbar } from "@/components/Navbar";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let rafId: number | null = null;
    let targetProgress = 0;
    let isAnimating = false;

    // ── Physics-based section scroll ──────────────────────────────
    const getActiveIndex = (): number => {
      const sections = document.querySelectorAll(".snap-section");
      const viewportCenter = window.scrollY + window.innerHeight / 2;
      let closest = 0;
      let closestDist = Infinity;

      sections.forEach((s, i) => {
        const rect = s.getBoundingClientRect();
        const sectionCenter = window.scrollY + rect.top + rect.height / 2;
        const dist = Math.abs(sectionCenter - viewportCenter);
        if (dist < closestDist) { closestDist = dist; closest = i; }
      });

      return closest;
    };

    const scrollToSection = (index: number) => {
      const sections = document.querySelectorAll(".snap-section");
      const target = sections[index] as HTMLElement;
      if (!target) return;

      const targetY = target.offsetTop + (target.offsetHeight - window.innerHeight) / 2;

      isAnimating = true;
      gsap.to(window, {
        scrollTo: { y: Math.max(0, targetY), autoKill: false },
        duration: 1.2,
        ease: "expo.inOut",
        onComplete: () => {
          isAnimating = false;
          ScrollTrigger.refresh();
        },
      });
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isAnimating) return;

      const sections = document.querySelectorAll(".snap-section");
      const current = getActiveIndex();
      const next = e.deltaY > 0
        ? Math.min(current + 1, sections.length - 1)
        : Math.max(current - 1, 0);

      if (next !== current) scrollToSection(next);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      e.preventDefault();
      if (isAnimating) return;

      const sections = document.querySelectorAll(".snap-section");
      const current = getActiveIndex();
      const next = e.key === "ArrowDown"
        ? Math.min(current + 1, sections.length - 1)
        : Math.max(current - 1, 0);

      if (next !== current) scrollToSection(next);
    };

    // Touch swipe support
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      if (isAnimating) return;
      const delta = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 30) return; // ignore small swipes

      const sections = document.querySelectorAll(".snap-section");
      const current = getActiveIndex();
      const next = delta > 0
        ? Math.min(current + 1, sections.length - 1)
        : Math.max(current - 1, 0);

      if (next !== current) scrollToSection(next);
    };

    // ── Video scrub ───────────────────────────────────────────────
    const onReady = () => {
      const waitForBuffer = () => {
        if (video.readyState >= 4) startScrub();
        else video.addEventListener("canplaythrough", startScrub, { once: true });
      };

      const startScrub = () => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          onUpdate: (self) => {
            targetProgress = self.progress;
            if (rafId === null) {
              rafId = requestAnimationFrame(() => {
                if (video.duration) video.currentTime = targetProgress * video.duration;
                rafId = null;
              });
            }
          },
        });
      };

      waitForBuffer();
    };

    if (video.readyState >= 1) onReady();
    else video.addEventListener("loadedmetadata", onReady, { once: true });

    // Attach events — wheel must be non-passive to call preventDefault
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      if (rafId !== null) cancelAnimationFrame(rafId);
      gsap.killTweensOf(window);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div className="fixed inset-0 z-0">
        <ScrollVideo ref={videoRef} />
      </div>
      <Overlay />
      <Footer />
      <ProgressDots />
      <Navbar />
    </div>
  );
}
