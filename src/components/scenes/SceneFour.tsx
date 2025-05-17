// src/components/scenes/SceneFour.tsx
"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import type { SceneType } from "@/types/scenes";
// Assets
import SceneFourTitle from "@/assets/scene-four-title.svg";
import SceneFourtext from "@/assets/scene-four-text.svg";
import SceneSecondtext from "@/assets/scene-foure-text-two.svg";
import SceneFourLasttext from "@/assets/scene-four-last-text.svg";
import RadioWaves from "@/assets/radio-waves.svg";

import RadioSVG from "@/assets/scene-foure-radio.svg";

interface SceneFourProps {
  setSceneStep: (s: SceneType) => void;
}

export default function SceneFour({ setSceneStep }: SceneFourProps) {
  const [isScrollEnabled, setIsScrollEnabled] = useState(false);

  const radioRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const secondTextRef = useRef<HTMLDivElement>(null);
  const lastTextRef = useRef<HTMLDivElement>(null);
  const radioWavesRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // 1) auto‐scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });

    // black when “on”
    const ACTIVE = "#2c2c2c";
    // lighter grey “after-glow”
    const FADE_OUT = "#666666";
    // idle color
    const DEFAULT = "#C7C7C7";

    const svgSelector = gsap.utils.selector(radioWavesRef.current);
    const wave1 = svgSelector(".radio-waves_svg__wave-1");
    const wave2 = svgSelector(".radio-waves_svg__wave-2");
    const wave3 = svgSelector(".radio-waves_svg__wave-3");
    const wave4 = svgSelector(".radio-waves_svg__wave-4");
    const wave5 = svgSelector(".radio-waves_svg__wave-5");
    const wave6 = svgSelector(".radio-waves_svg__wave-6");
    const wave7 = svgSelector(".radio-waves_svg__wave-7");

    const waves = [wave7, wave6, wave5, wave4, wave3, wave2, wave1];

    const ctx = gsap.context(() => {
      gsap.set(waves, { fill: DEFAULT });

      // delay between rings
      const STAGGER = 0.1;
      // how long a ring stays black
      const ON_TIME = 0.1;
      // FADE_OUT → DEFAULT
      const AFTERGLOW_TIME = 0.35;

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });

      waves.forEach((w, i) => {
        // start time for this ring
        const t0 = i * STAGGER;

        tl.to(
          w,
          { fill: FADE_OUT, duration: 0.2, ease: "expo.inOut" },
          t0 - ON_TIME
        )
          .to(w, { fill: ACTIVE, duration: 0.2, ease: "expo.inOut" }, t0)
          .to(w, { fill: FADE_OUT, duration: 0.2 }, t0 + ON_TIME)
          .to(
            w,
            { fill: DEFAULT, duration: AFTERGLOW_TIME, ease: "expo.inOut" },
            t0 + ON_TIME + AFTERGLOW_TIME
          );
      });
    }, radioWavesRef);

    // build our timeline
    const tl = gsap.timeline({ defaults: { duration: 1, ease: "power2.out" } });
    gsap.set(
      [
        titleRef.current,
        radioRef.current,
        radioWavesRef.current,
        textRef.current,
        secondTextRef.current,
        lastTextRef.current,
      ],
      {
        autoAlpha: 0,
      }
    );
    gsap.set(titleRef.current, { y: 60 });
    gsap.set(radioRef.current, { y: 20 });
    gsap.set(radioWavesRef.current, { y: 10 });

    gsap.set([textRef.current, secondTextRef.current, lastTextRef.current], {
      y: 70,
    });

    // A) reveal the entire text block
    tl.to(titleRef.current, { autoAlpha: 1, y: 0 }, 0)
      .to(radioRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 1,
      })
      .to(radioWavesRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 1,
      })
      .to(textRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
      })
      .to(secondTextRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
      })
      .to(lastTextRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
        onComplete: () => setIsScrollEnabled(true),
      });

    return () => {
      ctx.revert(); // cleanup

      tl.kill();
    };
  }, []);

  useEffect(() => {
    const onWheel = (() => {
      let wheelCount = 0;
      return () => {
        if (!isScrollEnabled || ++wheelCount < 2) return;

        window.removeEventListener("wheel", onWheel);
        const exit = gsap.timeline({});
        exit.to(
          contentWrapperRef.current,
          { y: "-=260", autoAlpha: 0, duration: 0.8 },
          0
        );
      };
    })();

    window.addEventListener("wheel", onWheel);
    return () => window.removeEventListener("wheel", onWheel);
  }, [isScrollEnabled, setSceneStep]);

  console.log(isScrollEnabled);

  return (
    <div className="relative flex-grow h-screen overflow-hidden flex items-center justify-center w-full z-10000 ">
      {/* Text elements positioned above video */}
      <div
        className="relative flex flex-col justify-center z-1000 items-start w-auto mt-10"
        ref={contentWrapperRef}
      >
        <div
          ref={titleRef}
          className="relative z-100 mb-8 w-full flex  h-[55vh] "
        >
          <SceneFourTitle />
        </div>

        <div
          ref={radioRef}
          className="absolute top-[10%] left-[20%] w-[48%] h-[44%] "
        >
          <RadioSVG />
        </div>

        <div
          ref={radioWavesRef}
          className="absolute -top-[5%] left-[60%] w-[20%]  "
        >
          <RadioWaves />
        </div>

        <div className="flex  absolute top-[40vh] right-[30%] gap-5 mt-8 ">
          <div ref={textRef}>
            <SceneFourtext className="w-[15dvw] " />
          </div>

          <div ref={secondTextRef}>
            <SceneSecondtext className="w-[7vw] -mt-5" />
          </div>

          <div ref={lastTextRef}>
            <SceneFourLasttext className="w-[9vw] -mt-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
