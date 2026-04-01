"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollVideo } from "@/components/ScrollVideo";
import { Overlay } from "@/components/Overlay";
import { Footer } from "@/components/Footer";
import { ProgressDots } from "@/components/ProgressDots";
import { Navbar } from "@/components/Navbar";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let rafId: number | null = null;
    let targetProgress = 0;

    // Keyboard navigation
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      e.preventDefault();

      const sections = document.querySelectorAll(".snap-section");
      const viewportCenter = window.scrollY + window.innerHeight / 2;
      let closest = 0;
      let closestDist = Infinity;
      sections.forEach((s, i) => {
        const rect = s.getBoundingClientRect();
        const center = window.scrollY + rect.top + rect.height / 2;
        const dist = Math.abs(center - viewportCenter);
        if (dist < closestDist) { closestDist = dist; closest = i; }
      });

      const next = e.key === "ArrowDown"
        ? Math.min(closest + 1, sections.length - 1)
        : Math.max(closest - 1, 0);

      if (next !== closest) {
        const target = sections[next] as HTMLElement;
        const targetY = target.offsetTop + (target.offsetHeight - window.innerHeight) / 2;
        gsap.to(window, {
          scrollTo: { y: Math.max(0, targetY), autoKill: true },
          duration: 1.8,
          ease: "power4.inOut",
        });
      }
    };

    // Video scrub
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
          scrub: 1,
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

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
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
