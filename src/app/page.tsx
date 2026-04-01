"use client";

import { useEffect, useRef, useCallback } from "react";
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

  // Keyboard navigation between sections
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;

    const sections = document.querySelectorAll(".snap-section");
    if (!sections.length) return;

    // Find which section is most visible
    let currentIndex = 0;
    const viewportCenter = window.scrollY + window.innerHeight / 2;
    sections.forEach((s, i) => {
      const rect = s.getBoundingClientRect();
      const sectionCenter = window.scrollY + rect.top + rect.height / 2;
      if (
        Math.abs(sectionCenter - viewportCenter) <
        Math.abs(
          (sections[currentIndex]?.getBoundingClientRect().top ?? 0) +
            window.scrollY +
            (sections[currentIndex]?.getBoundingClientRect().height ?? 0) / 2 -
            viewportCenter
        )
      ) {
        currentIndex = i;
      }
    });

    const nextIndex =
      e.key === "ArrowDown"
        ? Math.min(currentIndex + 1, sections.length - 1)
        : Math.max(currentIndex - 1, 0);

    if (nextIndex !== currentIndex) {
      e.preventDefault();
      sections[nextIndex].scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let rafId: number | null = null;
    let targetProgress = 0;

    const onReady = () => {
      // Wait for enough data to scrub smoothly
      const waitForBuffer = () => {
        if (video.readyState >= 4) {
          startScrub();
        } else {
          video.addEventListener("canplaythrough", startScrub, { once: true });
        }
      };

      const startScrub = () => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
          onUpdate: (self) => {
            targetProgress = self.progress;
            if (rafId === null) {
              rafId = requestAnimationFrame(() => {
                if (video.duration) {
                  video.currentTime = targetProgress * video.duration;
                }
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

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [handleKeyDown]);

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
