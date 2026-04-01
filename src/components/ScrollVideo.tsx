"use client";

import { forwardRef, useState } from "react";

export const ScrollVideo = forwardRef<HTMLVideoElement>(function ScrollVideo(_, ref) {
  const [hasVideo, setHasVideo] = useState(false);

  return (
    <div className="relative w-full h-full bg-black">
      <video
        ref={ref}
        src="/video/hero.mp4"
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        preload="auto"
        onLoadedData={() => setHasVideo(true)}
        onCanPlayThrough={() => setHasVideo(true)}
      />

      {!hasVideo && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <p className="text-xs text-white/30 font-mono tracking-wider uppercase">
            /public/video/hero.mp4
          </p>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 pointer-events-none" />
    </div>
  );
});
