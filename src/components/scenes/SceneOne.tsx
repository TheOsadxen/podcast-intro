"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { SceneType } from "@/types/scenes";
import WelcomTitle from "@/assets/scene-one-title.svg";
import WelcomSubTitle from "@/assets/scene-one-subtitle.svg";
import ButtonText from "@/assets/scene-one-button-text.svg";
import SceneOneDisclaimer from "@/assets/scene-one-disclaimer.svg";

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
  const [isScrollEnabled, setIsScrollEnabled] = useState(false);

  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const guyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sceneStep === "landing-page" || !isScrollEnabled) return;

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
  }, [isScrollEnabled, sceneStep, setSceneStep, setShowScrollMouse]);

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
        onComplete: () => {
          setSceneStep("sceneOne");
          setTimeout(() => {
            setIsScrollEnabled(true);
          }, 1000);
        },
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
    <div className="relative flex-grow flex items-center justify-center mb-5 h-screen overflow-hidden">
      {/* Background SVG */}
      <Image
        src="/waves-vector.svg"
        width={700}
        height={700}
        alt="bg-waves"
        className="absolute inset-0 w-full h-full object-contain z-0 scale-90 mt-4"
      />

      {/* Text */}
      <div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center"
        ref={textRef}
      >
        <div className="text-center mt-10 flex items-end relative">
          <WelcomTitle
            className="w-[24vw] max-w-[330px] h-auto"
            ref={textRef}
            preserveAspectRatio="xMidYMid meet"
          />

          <div className="absolute top-[80px] right-0 w-[100%] text-center font-[600] rtl">
            <WelcomSubTitle
              className="w-[12vw] max-w-[200px] h-auto mx-auto "
              ref={textRef}
              preserveAspectRatio="xMidYMid meet"
            />
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
              <ButtonText
                className="w-full max-w-[150px] h-auto mx-4"
                preserveAspectRatio="xMidYMid meet"
              />
            </button>
          )}

          <footer
            className={`p-4 text-center text-sm flex gap-2 items-end mx-auto ${
              sceneStep === "landing-page" ? "visible" : "hidden"
            }`}
          >
            <Image
              src="/headphones.svg"
              width={20}
              height={20}
              alt="headset-icon"
            />

            <SceneOneDisclaimer
              className="w-full  h-auto mx-1"
              preserveAspectRatio="xMidYMid meet"
            />
          </footer>
        </div>
      )}

      <div
        ref={guyRef}
        className="
      absolute
      left-[48%] top-[54%]            
      transform -translate-x-1/2 -translate-y-1/2
      opacity-0
      z-100
    "
        style={{ transformOrigin: "center center" }}
      >
        <Image
          src="/saudi-man.svg"
          alt="Guy"
          width={300}
          height={400}
          className="w-[40vw] max-w-[380px] h-auto"
          style={{
            imageRendering: "crisp-edges",
            imageResolution: "from-image",
          }}
        />
      </div>
    </div>
  );
}
