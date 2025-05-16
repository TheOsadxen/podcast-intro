// src/components/SceneTwo.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import PhoneSVG from "@/assets/mobile.svg";
import OrangeSVG from "@/assets/orange-sentence.svg";
import BlackSVG from "@/assets/black-sentence.svg";

export default function SceneTwo() {
  const blackRef = useRef<HTMLDivElement>(null);
  const orangeRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // 1) Black fades in
    tl.fromTo(
      blackRef.current,
      { autoAlpha: 0, y: 30 },
      { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" }
    )
      // 2) Black slides down a bit
      .to(
        blackRef.current,
        { y: 60, duration: 0.8, ease: "power2.inOut" },
        "+=0.2"
      );
    // 3) Orange scales up like a curtain
    tl.fromTo(
      orangeRef.current,
      { autoAlpha: 1, clipPath: "inset(0 50% 0 50%)" },
      {
        autoAlpha: 1,
        clipPath: "inset(0 0% 0% 0%)",
        duration: 1.6,
        ease: "power3.out",
      },
      "-=0.8"
    );
    // 4) Phone fades in & tilts
    tl.fromTo(
      phoneRef.current,
      { autoAlpha: 0, rotate: -8, transformOrigin: "center center" },
      { autoAlpha: 1, rotate: 3, duration: 1.2, ease: "power2.out" },
      "-=1.0"
    );
  }, []);

  return (
    <div className="relative flex-grow flex items-center justify-center mb-5">
      {/* Background SVG */}
      <Image
        src="/waves-vector.svg"
        width={800}
        height={800}
        alt="bg-waves"
        className="absolute inset-0 my-auto h-full w-full object-contain z-0 mt-10"
      />

      {/* Layer container */}
      <div className="relative w-[80vw] max-w-[900px] h-auto">
        {/* 1) Phone (z-10) */}
        <div
          ref={phoneRef}
          className="absolute z-10"
          style={{
            top: "25%",
            left: "50%",
            transform: "translate(-50%, -80%)",
          }}
        >
          <PhoneSVG
            className="w-[24vw] max-w-[200px] h-auto"
            preserveAspectRatio="xMidYMid meet"
          />
        </div>

        {/* 2) Orange headline (z-20), pulled *down* closer to the black */}
        <div
          ref={orangeRef}
          className="absolute z-20"
          style={{
            top: "53%", // ← bring this down from ~48%
            left: "50%",
            transform: "translate(-50%, -5%)",
          }}
        >
          <OrangeSVG
            className="w-[60vw] max-w-[700px] h-auto"
            preserveAspectRatio="xMidYMid meet"
          />
        </div>

        {/* 3) Black subhead (z-30) */}
        <div
          ref={blackRef}
          className="absolute z-30"
          style={{
            top: "60%", // stay ~60% so it intersects
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <BlackSVG
            className="w-[50vw] max-w-[400px] h-auto"
            preserveAspectRatio="xMidYMid meet"
          />
        </div>
      </div>
    </div>
  );
}
