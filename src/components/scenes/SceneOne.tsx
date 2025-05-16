"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { SceneType } from "@/types/scenes";

interface SceneOneProps {
  setSceneStep: (step: SceneType) => void;
  sceneStep: SceneType;
  showStartTourButton: boolean;
  setShowStartTourButton: (val: boolean) => void;
  setShowIntroFooter: (val: boolean) => void;
  setShowScrollMouse: (val: boolean) => void;
  sceneRef: React.RefObject<HTMLDivElement>;
}

export default function SceneOne({
  setSceneStep,
  showStartTourButton,
  setShowStartTourButton,
  setShowIntroFooter,
  setShowScrollMouse,
  sceneRef,
  sceneStep,
}: SceneOneProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const guyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sceneStep === "landing-page") return;

    let scrollCount = 0;

    const handleWheel = () => {
      scrollCount++;
      if (scrollCount === 2 && sceneStep === "sceneOne") {
        gsap.to(guyRef.current, {
          opacity: 0,
          scale: 0.85,
          duration: 0.6,
          ease: "power2.inOut",
          onComplete: () => {
            setTimeout(() => {
              setShowScrollMouse(false);
              setSceneStep("sceneTwo");
            }, 700);
          },
        });

        window.removeEventListener("wheel", handleWheel);
      }
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [sceneStep, setSceneStep, setShowScrollMouse]);

  const handleStartClick = () => {
    const tl = gsap.timeline();

    tl.to(
      buttonRef.current,
      { width: 72, duration: 0.2, ease: "power2.inOut" },
      0
    );
    tl.to(
      textRef.current,
      {
        y: -100,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        onComplete: () => setShowStartTourButton(false),
        ease: "power2.inOut",
      },
      0
    );
    tl.to(
      (sceneRef as React.RefObject<HTMLDivElement>)?.current,
      {
        scale: 1.4,
        duration: 1.6,
        ease: "power2.inOut",
        transformOrigin: "center center",
        onComplete: () => setSceneStep("sceneOne"),
      },
      0
    );

    tl.fromTo(
      guyRef.current,
      { opacity: 0, scale: 0.7 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        onStart: () => setShowIntroFooter(true),
        onComplete: () => {
          setTimeout(() => {
            setShowScrollMouse(true);
          }, 700);
        },
      },
      "-=0.7"
    );
  };

  return (
    <div className="relative flex-grow flex items-center justify-center mb-5">
      {/* Background SVG */}
      <Image
        src="/waves-vector.svg"
        width={700}
        height={700}
        alt="bg-waves"
        className="absolute inset-0 my-auto h-[92%] w-full object-contain z-0 mt-10"
      />

      {/* Text */}
      <div
        className="absolute inset-0 z-10 flex-col flex items-center justify-center"
        ref={textRef}
      >
        <div className="text-center mt-10 flex items-end relative">
          <h2
            className="text-lg md:text-5xl font-bold rtl text-black align-bottom"
            style={{ fontFamily: `"source-arabic-sans", sans-serif` }}
          >
            أهلاً بك في <span className="text-light-orange">مُكالمة،</span>
          </h2>
          <div className="absolute top-[80px] right-0 w-[100%] text-center font-[600] rtl">
            <p className="mb-1">منصتك لاكتشاف أفكار مبتكرة</p>
            <p>تلهم التغيير الإيجابي.</p>
          </div>
        </div>
      </div>

      {/* Start Button */}
      {showStartTourButton && (
        <div className="mx-auto flex flex-col items-center justify-end self-end gap-12 mt-10">
          {showStartTourButton && (
            <button
              ref={buttonRef}
              onClick={handleStartClick}
              className="cursor-pointer z-200 flex flex-row-reverse items-center overflow-hidden h-[48px] rounded-[20px] bg-[#e2ddbf] backdrop-blur-[13px] text-black px-1.5 transition-all duration-500"
            >
              <div className="flex-shrink-0">
                <Image
                  src="/play-icon.svg"
                  width={60}
                  height={40}
                  alt="play-icon"
                />
              </div>

              {/* Text - gets clipped from left */}
              <span
                className="text-lg font-bold whitespace-nowrap me-3"
                style={{ minWidth: "160px" }}
              >
                ابــــــــدأ التجربة
              </span>
            </button>
          )}

          <footer
            className={`p-4 text-center text-sm flex gap-2 items-center mx-auto ${
              sceneStep === "landing-page" ? "visible" : "hidden"
            }`}
          >
            <Image
              src="/headphones.svg"
              width={20}
              height={20}
              alt="headset-icon"
            />
            <p className="text-md mt-2 text-faded-black opacity-[50%]">
              ننصح باستخدام سماعات الرأس لتحقيق أفضل تجربة.
            </p>
          </footer>
        </div>
      )}

      {/* Saudi Guy */}
      <div
        ref={guyRef}
        className="absolute  inset-0 z-100 flex items-center justify-center opacity-0"
        style={{ transformOrigin: "center center" }}
      >
        <div className="relative w-[32vw] h-[39vh] flex justify-center items-center mt-25 mr-20">
          <Image
            src="/saudi-man.svg"
            alt="Guy"
            fill
            className="object-fill relative z-10"
            style={{
              imageRendering: "crisp-edges",
              imageResolution: "from-image",
            }}
          />
        </div>
      </div>
    </div>
  );
}
