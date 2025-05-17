"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import type { SceneType } from "@/types/scenes";
// Assets
import StandingGuySceneSVG from "@/assets/scene-three.svg";
import OrangeTextSVG from "@/assets/scene-three-orange-text.svg";
import BlackTextSVG from "@/assets/scene-three-black-text.svg";

interface SceneThreeProps {
  setSceneStep: (s: SceneType) => void;
}

export default function SceneThree({ setSceneStep }: SceneThreeProps) {
  const [isScrollEnabled, setIsScrollEnabled] = useState(false);

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
      rotation: -14,
      transformOrigin: "50% 50%",
      transformBox: "fillBox",
    });

    gsap.set(svgSelector(".scene-three_svg__bulb-light"), {
      rotation: -17,
      transformOrigin: "50% 55%",
      transformBox: "fillBox",
    });

    // 3) Prepare diode: no rotation shift
    gsap.set(bulbDoide, {
      rotation: -20,
      transformOrigin: "top right",
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
        onComplete: () => {
          setTimeout(() => {
            setIsScrollEnabled(true);
          }, 1000);
        },
      },
      0
    );

    const shakeTl = gsap.timeline({
      repeat: -1,
      repeatDelay: 2,
    });

    shakeTl.fromTo(
      magicStar,
      {
        rotation: 10,
        duration: 0.08,
        ease: "sine.inOut",
        yoyo: true,
        repeat: 2,
        transformOrigin: "50% 50%",
      },
      {
        rotation: -10,
        duration: 0.08,
        ease: "sine.inOut",
        yoyo: true,
        repeat: 2,
        transformOrigin: "50% 50%",
      }
    );

    gsap.set([...rocket, ...rocketGas], { transformOrigin: "50% 90%" });

    const rocketTimeline = gsap.timeline({ repeat: -1, yoyo: true });

    rocketTimeline.to([...rocket, ...rocketGas], {
      x: 8,
      rotation: -6,
      duration: 0.5,
      ease: "steps(2)",
      yoyo: true,
      repeat: -1,
    });

    // Then spin the glass back to its native tilt
    tl.to([...bulbGlass, ...bulbDoide], {
      rotation: 0, // back to that 15° tilt
      duration: 0.5,
      ease: "power2.out",
    });

    const bulbLightTimeLineLoop = gsap.timeline({
      repeat: -1,
      defaults: { ease: "bounce.inOut" },
    });

    bulbLightTimeLineLoop.to({}, { duration: 1 }, "+=2");

    bulbLightTimeLineLoop.to(svgSelector("  .scene-three_svg__bulb-light"), {
      fill: "#E4E4E4",
      duration: 0.2,
    });
    bulbLightTimeLineLoop.to({}, { duration: 0.2 }, "+=0.5");

    bulbLightTimeLineLoop.to(svgSelector("  .scene-three_svg__bulb-light"), {
      fill: "#FFD503",
      duration: 0.2,
    });

    bulbLightTimeLineLoop.to({}, { duration: 0.2 }, "+=0.5");

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    const onWheel = (() => {
      let wheelCount = 0;
      return () => {
        if (!isScrollEnabled) return;

        if (++wheelCount < 2) return;

        window.removeEventListener("wheel", onWheel);

        const mask = document.getElementById("rhombMask")!;
        const kids = contentWrapperRef.current!.children;

        gsap.set(mask, { scale: 1, transformOrigin: "50% 50%", opacity: 0 });

        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          onComplete: () => setSceneStep("sceneFour"),
        });

        // 1️⃣ lift + fade Scene-3 elements
        tl.to(kids, { yPercent: -120, duration: 1 })
          .to(kids, { opacity: 0, duration: 0.8, stagger: 0.03 }, "<")

          .to({}, { duration: 2 })

          .to(mask, { scale: 3, duration: 0.8, opacity: 1 })
          .to(mask, { scale: 12, duration: 0.8, ease: "power2.in" })
          .to(mask, { autoAlpha: 0, duration: 0.3 });
      };
    })();

    window.addEventListener("wheel", onWheel);
    return () => window.removeEventListener("wheel", onWheel);
  }, [isScrollEnabled, setSceneStep]);

  return (
    <div className="relative flex-grow h-screen overflow-hidden flex items-center justify-center w-full">
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
