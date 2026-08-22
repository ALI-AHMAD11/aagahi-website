import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface VideoHeroBackgroundProps {
  overlayOpacity?: number; // 0 to 100
}

export const VideoHeroBackground: React.FC<VideoHeroBackgroundProps> = ({
  overlayOpacity = 40,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Subtle courtroom-style parallax: as the user scrolls past the hero,
  // the video drifts slightly slower than the page for a sense of depth.
  // Additive only — does not touch the existing overlay/gradient layers below.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    video.defaultMuted = true;
    video.playbackRate = 0.5;
    video.loop = true;

    const startPlayback = () => {
      if (!video) return;
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          video.muted = true;
          video.play().then(() => setIsPlaying(true)).catch(() => {});
        });
    };

    startPlayback();

    const handleInteraction = () => {
      if (video && video.paused) {
        startPlayback();
      }
    };

    window.addEventListener("click", handleInteraction, { once: true });
    window.addEventListener("touchstart", handleInteraction, { once: true });
    window.addEventListener("scroll", handleInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none z-0">
      {/* Active High-Definition Background Video Stream (with subtle scroll parallax) */}
      <motion.video
        ref={videoRef}
        style={{ y: parallaxY }}
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        disableRemotePlayback
        preload="auto"
        onPlaying={() => setIsPlaying(true)}
        className="absolute inset-0 w-full h-[130%] object-cover object-center transition-all duration-700 filter brightness-105 contrast-110"
      >
        <source src="/court-gavel-bg.mp4" type="video/mp4" />
      </motion.video>

      {/* Transparent Cinematic Overlays */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/30 to-slate-950/80 transition-opacity duration-500" 
        style={{ opacity: overlayOpacity / 100 }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(76,29,149,0.18)_0%,rgba(2,6,23,0.6)_100%)] pointer-events-none" />

      {/* Subtle Geometric Justice Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#78350f14_1px,transparent_1px),linear-gradient(to_bottom,#78350f14_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_70%,transparent_100%)] pointer-events-none" />
    </div>
  );
};

