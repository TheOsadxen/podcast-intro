// src/components/scenes/SceneFour.tsx
"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import type { SceneType } from "@/types/scenes";
// Assets
import SceneFourTitle from "@/assets/scene-four-title.svg";
import OrangeTextSVG from "@/assets/scene-three-orange-text.svg";
import BlackTextSVG from "@/assets/scene-three-black-text.svg";

interface SceneFourProps {
  setSceneStep: (s: SceneType) => void;
}

export default function SceneFour({ setSceneStep }: SceneFourProps) {
  const [isScrollEnabled, setIsScrollEnabled] = useState(false);

  const blackRef = useRef<HTMLDivElement>(null);
  const redRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const SceneFourTitleRef = useRef<SVGSVGElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    // 1) auto‐scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });

    // build our timeline
    const tl = gsap.timeline({ defaults: { duration: 1, ease: "power2.out" } });

    // A) reveal the entire text block
    tl.fromTo(
      contentWrapperRef.current,
      { autoAlpha: 0, y: 60 },
      { autoAlpha: 1, y: 0 },
      0
    );

    // gsap.set(SceneFourTitleRef?.current, {
    //   autoAlpha: 0,
    //   y: 30,
    // });

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    // const onWheel = (() => {
    //   let wheelCount = 0;
    //   return () => {
    //     if (!isScrollEnabled) return;
    //     if (++wheelCount < 2) return; // require two notches
    //     window.removeEventListener("wheel", onWheel);
    //     const mask = document.getElementById("rhombMask")!;
    //     const kids = contentWrapperRef.current!.children;
    //     /* make sure mask starts collapsed */
    //     gsap.set(mask, { scale: 1, transformOrigin: "50% 50%", opacity: 0 });
    //     const tl = gsap.timeline({
    //       defaults: { ease: "power2.out" },
    //       onComplete: () => setSceneStep("sceneFour"),
    //     });
    //     // 1️⃣ lift + fade Scene-3 elements
    //     tl.to(kids, { yPercent: -120, duration: 1 })
    //       .to(kids, { opacity: 0, duration: 0.8, stagger: 0.03 }, "<")
    //       // 2️⃣ hold on beige background (nav + footer still visible)
    //       .to({}, { duration: 2 })
    //       // 3️⃣ rhombus zooms to fill everything under nav/footer
    //       .to(mask, { scale: 3, duration: 0.8, opacity: 1 }) // edges appear
    //       .to(mask, { scale: 12, duration: 0.8, ease: "power2.in" });
    //   };
    // })();
    // window.addEventListener("wheel", onWheel);
    // return () => window.removeEventListener("wheel", onWheel);
  }, [isScrollEnabled, setSceneStep]);

  return (
    <div className="relative flex-grow h-screen overflow-hidden flex items-center justify-center w-full z-10000">
      {/* Text elements positioned above video */}
      <div
        className="relative flex flex-col justify-center z-10000000 items-center "
        ref={contentWrapperRef}
      >
        <div ref={redRef} className="relative z-100 mb-6">
          <SceneFourTitle className="w-[60dvw] h-auto" />
        </div>

        {/* This is the container for the black text, positioned relative */}
        <div ref={blackRef} className="relative z-100 mb-4">
          <BlackTextSVG className="w-[60dvw] h-auto" />
        </div>
      </div>
    </div>
  );
}
