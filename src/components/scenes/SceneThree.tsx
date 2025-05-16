// src/components/scenes/SceneThree.tsx
"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import type { SceneType } from "@/types/scenes";
// Assets
import StandingGuySceneSVG from "@/assets/scene-three.svg";
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
  const guyRef = useRef<SVGSVGElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    // 1) auto‐scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
    const svgSelector = gsap.utils.selector(guyRef.current);

    const bulbGlass = svgSelector(
      " .scene-three_svg__whole-bulb, .scene-three_svg__bulb-light"
    );

    const magicStar = svgSelector(" .scene-three_svg__magic-star");

    const star = svgSelector(" .scene-three_svg__star");

    const bulbDoide = svgSelector(".scene-three_svg__bulb-doide");

    const rocket = svgSelector(".scene-three_svg__rocket");
    const rocketGas = svgSelector(".scene-three_svg__rocket-gas");
    const circle = svgSelector(".scene-three_svg__circle");

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

    gsap.set([...bulbGlass, ...bulbDoide], { autoAlpha: 0 });

    gsap.set([...star, ...magicStar, ...rocket, ...rocketGas, ...circle], {
      autoAlpha: 0,
      y: 30,
    });

    // 2) Counter-rotate only the glass so it pops in straight:
    gsap.set(svgSelector(".scene-three_svg__whole-bulb"), {
      rotation: -14, // cancel the built-in tilt
      transformOrigin: "50% 50%",
      transformBox: "fillBox",
    });

    gsap.set(svgSelector(".scene-three_svg__bulb-light"), {
      rotation: -17, // cancel the built-in tilt
      transformOrigin: "50% 55%",
      transformBox: "fillBox",
    });

    // 3) Prepare diode: no rotation shift
    gsap.set(bulbDoide, {
      rotation: -20,
      transformOrigin: "top right", // pivot near the top of the diode
    });

    tl.to(
      [...bulbGlass, ...bulbDoide],
      {
        autoAlpha: 1,
        duration: 0.3,
      },
      0
    );

    tl.to(
      [...magicStar, ...star, ...rocket, ...rocketGas, ...circle],
      {
        autoAlpha: 1,
        duration: 0.3,
        y: 0,
        delay: 1.5,
        ease: "power1.inOut",
      },
      0
    );

    const shakeTl = gsap.timeline({
      repeat: -1, // loop for ever
      repeatDelay: 2, // <-- 2-second rest AFTER each shake burst
    });

    shakeTl.to(magicStar, {
      rotation: 25, // ±25° swing
      duration: 0.08, // very quick
      ease: "sine.inOut",
      yoyo: true, // auto-reverse
      repeat: 5, // 6 swings = 3 full back-and-forth cycles
      transformOrigin: "50% 50%", // pivot at centre
    });

    //  ▸ pivot near the engine nozzle so the nose really swings
    gsap.set([...rocket, ...rocketGas], { transformOrigin: "50% 90%" });

    const rocketTimeline = gsap.timeline({ repeat: -1, yoyo: true }); // endless pendulum

    rocketTimeline.to([...rocket, ...rocketGas], {
      x: 8, // only 8 px left ↔ right
      rotation: -6, // tilt the opposite way (±6°)
      duration: 0.5, // very fast
      ease: "steps(2)", // 2-frame “choppy” motion
      yoyo: true, // bounce back
      repeat: -1, // loop forever
    });

    // Then spin the glass back to its native tilt
    tl.to([...bulbGlass, ...bulbDoide], {
      rotation: 0, // back to that 15° tilt
      duration: 0.5,
      ease: "power2.out",
      // x: 0,
    });

    const bulbLightTimeLineLoop = gsap.timeline({
      repeat: -1,
      defaults: { ease: "bounce.inOut" },
    });

    // 1s pause
    bulbLightTimeLineLoop.to({}, { duration: 1 }, "+=2");

    // tween to gray
    bulbLightTimeLineLoop.to(svgSelector("  .scene-three_svg__bulb-light"), {
      fill: "#E4E4E4",
      duration: 0.2,
    });
    bulbLightTimeLineLoop.to({}, { duration: 0.2 }, "+=0.5");

    // tween back to original
    bulbLightTimeLineLoop.to(svgSelector("  .scene-three_svg__bulb-light"), {
      fill: "#FFD503",
      duration: 0.2,
    });
    bulbLightTimeLineLoop.to({}, { duration: 0.2 }, "+=0.5");

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
        <StandingGuySceneSVG
          ref={guyRef}
          className="w-auto absolute h-[120%] left-[30%]  z-1000"
        />

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
