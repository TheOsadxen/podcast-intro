// src/components/SceneTwo.tsx
"use client";

import { RefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import PhoneSVG from "@/assets/mobile.svg";
import OrangeSVG from "@/assets/orange-sentence.svg";
import BlackSVG from "@/assets/black-sentence.svg";
import { SceneType } from "@/types/scenes";

interface SceneTwoProps {
  setSceneStep: (step: SceneType) => void;
}

export default function SceneTwo({ setSceneStep }: SceneTwoProps) {
  const [isScrollEnabled, setIsScrollEnabled] = useState(false);

  const blackRef = useRef<HTMLDivElement>(null);
  const orangeRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const wavesRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // 0️⃣ Make sure nothing is visible initially
    gsap.set([blackRef.current, orangeRef.current, phoneRef.current], {
      autoAlpha: 0,
      opacity: 0,
      visibility: "hidden",
    });

    const tl = gsap.timeline();

    // 1️⃣ Black fades in from below
    tl.fromTo(
      blackRef.current,
      { autoAlpha: 0, y: 30 },
      { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" }
    )
      // Label the start of Scene 2
      .addLabel("scene2Start", "+=0.2")
      // 2️⃣ At scene2Start: push black down
      .to(
        blackRef.current,
        { y: 110, duration: 0.8, ease: "power2.inOut" },
        "scene2Start"
      )

      // 3️⃣ At scene2Start: rotate & scale waves
      .to(
        wavesRef.current,
        {
          scale: 1.3,
          rotation: -45,
          opacity: 0.3,
          transformOrigin: "center center",
          duration: 1,
          ease: "power2.inOut",
        },
        "scene2Start"
      )

      // 4️⃣ At scene2Start: orange “curtain” reveal
      .fromTo(
        orangeRef.current,
        { autoAlpha: 1, clipPath: "inset(0 50% 0 50%)", opacity: 1 },
        {
          autoAlpha: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.1,
          ease: "power3.out",
          opacity: 1,
          onComplete: () => setIsScrollEnabled(true),
        },
        "scene2Start"
      )
      // 5️⃣ At scene2Start: phone fade + tilt
      .fromTo(
        phoneRef.current,
        {
          autoAlpha: 0,
          rotate: -45,
          transformOrigin: "center center",
          scale: 0.6,
        },
        {
          autoAlpha: 1,
          rotate: 3,
          duration: 1,
          ease: "power2.out",
          scale: 1,
        },
        "scene2Start-=0.1"
      );

    return () => {
      tl.kill();
    };
  }, [setSceneStep]);

  useEffect(() => {
    let wheelCount = 0;
    const onWheel = () => {
      if (!isScrollEnabled) return;

      wheelCount++;
      if (wheelCount >= 2) {
        window.removeEventListener("wheel", onWheel);
        // run your exit timeline
        const exit = gsap.timeline({
          onComplete: () => setSceneStep("sceneThree"),
        });
        exit
          .to(wavesRef.current, { autoAlpha: 0, duration: 0.8 }, 0)
          .to(
            blackRef.current,
            { y: "-=260", autoAlpha: 0, duration: 1.2, ease: "power2.inOut" },
            0
          )
          .to(
            phoneRef.current,
            { y: "-=280", autoAlpha: 0, duration: 1.2, ease: "power2.inOut" },
            0.05
          )
          .to(
            orangeRef.current,
            { y: "-=240", autoAlpha: 0, duration: 1.2, ease: "power2.inOut" },
            0.1
          );
      }
    };
    window.addEventListener("wheel", onWheel);

    return () => {
      window.removeEventListener("wheel", onWheel);
      // kill any timelines here…
    };
  }, [isScrollEnabled, setSceneStep]);

  return (
    <div
      className={`relative flex-grow flex items-center justify-center mb-5  h-screen   overflow-hidden     
      `}
    >
      {/* Background SVG */}
      <Image
        src="/waves-vector.svg"
        width={700}
        height={700}
        alt="bg-waves"
        className="absolute inset-0 w-full h-full object-contain z-0 scale-90 mt-4"
        ref={wavesRef as RefObject<HTMLImageElement>}
      />

      {/* Layer container */}
      <div className="relative w-[80vw] max-w-[900px] h-auto">
        {/* 1) Phone (z-10) */}
        <div
          ref={phoneRef}
          className="absolute z-10"
          style={{
            top: "55%",
            left: "50%",
            transform: "translate(-50%, -70%)",
          }}
        >
          <PhoneSVG
            className="w-[24vw] max-w-[300px] h-auto"
            preserveAspectRatio="xMidYMid meet"
          />
        </div>

        {/* 2) Orange headline (z-20), pulled *down* closer to the black */}
        <div
          ref={orangeRef}
          className="absolute z-20 "
          style={{
            top: "53%", // ← bring this down from ~48%
            left: "50%",
            transform: "translate(-50%, -5%)",
          }}
        >
          <OrangeSVG
            className="w-[60vw] max-w-[940px] h-auto"
            preserveAspectRatio="xMidYMid meet"
          />
        </div>

        {/* 3) Black subhead (z-30) */}
        <div
          ref={blackRef}
          className="absolute z-30 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <BlackSVG
            className="w-[50vw] max-w-[370px] h-auto mt-8"
            preserveAspectRatio="xMidYMid meet"
          />
        </div>
      </div>
    </div>
  );
}
