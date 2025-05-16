// src/components/scenes/SceneThree.tsx
"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import type { SceneType } from "@/types/scenes";

// Assets
import GuySVG from "@/assets/scene-three.svg";
import OrangeTextSVG from "@/assets/scene-three-orange-text.svg";
import BlackTextSVG from "@/assets/scene-three-black-text.svg";

// This component only needs setSceneStep to hand off to sceneFour
interface SceneThreeProps {
  setSceneStep: (s: SceneType) => void;
}

export default function SceneThree({}: SceneThreeProps) {
  const [isScrollEnabled, setIsScrollEnabled] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const blackRef = useRef<HTMLDivElement>(null);
  const redRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const guyRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    // 1) auto‐scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
    // 2) start video
    videoRef.current?.play().catch(() => {});

    // build our timeline
    const tl = gsap.timeline({ defaults: { duration: 1, ease: "power2.out" } });

    // A) reveal the entire text block
    tl.fromTo(
      contentWrapperRef.current,
      { autoAlpha: 0, y: 60 },
      { autoAlpha: 1, y: 0 },
      0
    );

    // C) star pops up from behind
    // tl.fromTo(
    //   starRef.current,
    //   { autoAlpha: 0, y: 100, rotation: -30, transformOrigin: "center center" },
    //   { autoAlpha: 1, y: 0, rotation: 0 },
    //   0.4
    // );

    // D) bulb pops up in front
    // tl.fromTo(
    //   lampRef.current,
    //   { autoAlpha: 0, y: 100, rotation: 30, transformOrigin: "center center" },
    //   { autoAlpha: 1, y: 0, rotation: 0 },
    //   0.5
    // );

    // E) a quick tilt wiggle on each
    // tl.to(
    //   starRef.current,
    //   { rotation: 15, yoyo: true, repeat: 1, duration: 0.4 },
    //   "+=0.3"
    // );
    // tl.to(
    //   lampRef.current,
    //   { rotation: -15, yoyo: true, repeat: 1, duration: 0.4 },
    //   "<"
    // );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative flex-grow h-screen overflow-hidden flex items-center justify-center w-full"
    >
      {/* 1) Background video */}

      {/* Text elements positioned above video */}
      <div
        className="relative flex flex-col justify-center z-10000 items-center "
        ref={contentWrapperRef}
      >
        <GuySVG className="w-auto absolute h-[120%] left-[30%]  z-1000" />

        <div ref={redRef} className="relative z-100 mb-6">
          <OrangeTextSVG className="w-[60dvw] h-auto" />
        </div>

        {/* This is the container for the black text, positioned relative */}
        <div ref={blackRef} className="relative z-100 mb-4">
          <BlackTextSVG className="w-[60dvw] h-auto" />

          {/* Video positioned absolutely within the black text container */}
          <video
            ref={videoRef}
            src="/waves.webm"
            autoPlay
            muted
            loop
            playsInline
            style={{ zIndex: -1 }}
            className="
        absolute
        top-2/3
        left-[65%]
        transform
        -translate-x-1/2
        -translate-y-1/2
        w-[34%]
        h-[300%]
        z-0
        filter
        saturate-150
        contrast-150
        brightness-75
      "
          />
        </div>
      </div>
    </div>
  );
}
