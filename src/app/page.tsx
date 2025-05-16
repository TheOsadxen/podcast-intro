"use client";

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import SceneOne from "@/components/scenes/SceneOne";
import { SceneType } from "@/types/scenes";
import SceneTwo from "@/components/scenes/SceneTwo";
import SceneThree from "@/components/scenes/SceneThree";

export default function Home() {
  const [sceneStep, setSceneStep] = useState<SceneType>("landing-page");
  const [showStartTourButton, setShowStartTourButton] = useState<boolean>(true);
  const [showIntroFooter, setShowIntroFooter] = useState<boolean>(false);
  const [showScrollMouse, setShowScrollMouse] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [menuHeight, setMenuHeight] = useState(0);

  const sceneRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuExpanderIconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMenuOpen && menuRef.current) {
      const height = menuRef.current.scrollHeight;
      setMenuHeight(height);
    } else {
      setMenuHeight(0);
    }
  }, [isMenuOpen]);

  useEffect(() => {
    if (sceneStep === "landing-page") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [sceneStep]);

  const handleExpandMenuIcon = (): void => {
    const tl = gsap.timeline();
    tl.to(
      menuExpanderIconRef.current,
      {
        gap: 10,
        duration: 0.8,
        ease: "power2.inOut",
      },
      0
    );
  };

  return (
    <div
      className={`min-h-screen flex flex-col bg-background px-[5%] w-full h-100dvh`}
    >
      <Head>
        <title>مكالمة | Mukalamah</title>
        <meta name="description" content="منصتك لاكتشاف أفكار مبتكرة" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="fixed top-0 left-[5%] w-[90%] z-5000 pt-6 bg-transparent">
        {/*Navbar section */}
        <div className=" w-full">
          {/* Logo and social media icons */}
          <div className="  mx-auto flex justify-between items-center">
            <div className="text-right">
              <Image
                src="/LOGO.svg"
                alt="Logo"
                width={142}
                height={40}
                priority
              />
            </div>

            <div className="relative">
              {/* Main container with onMouseLeave handler */}
              <div
                className="relative"
                onMouseLeave={() => setIsMenuOpen(false)}
              >
                {/* Header area with icons - will be covered by menu when open */}
                <div className="flex items-center  p-4 bg-transparent rounded-lg z-5000 relative ">
                  {/* Contact Icons */}
                  <Link href="tel:+123456789" className="me-6">
                    <Image
                      src="/subtract.svg"
                      alt="call"
                      width={22}
                      height={20}
                    />
                  </Link>
                  <Link href="https://instagram.com" className="me-6">
                    <Image
                      src="/vector.svg"
                      alt="instagram"
                      width={22}
                      height={20}
                    />
                  </Link>
                  <Link href="mailto:info@example.com" className="me-12">
                    <Image
                      src="/intersect.svg"
                      alt="mail"
                      width={22}
                      height={20}
                    />
                  </Link>

                  {/* Burger Icon - Only this triggers the menu open */}
                  <div
                    onMouseEnter={() => {
                      setIsMenuOpen(true);
                      handleExpandMenuIcon();
                    }}
                    className="inline-flex flex-col justify-center gap-2.5 items-center cursor-pointer group "
                  >
                    <span className="block w-8 h-1 bg-black group-hover:bg-[#e56e53] transition-all duration-300 ease-in-out"></span>
                    <span className="block w-8 h-1 bg-[#e56e53] group-hover:bg-black transition-all duration-300 ease-in-out"></span>
                  </div>
                </div>

                {/* Dropdown Menu that overlays the header */}
                <div
                  ref={menuRef}
                  className={`absolute top-0 left-0 w-full ${
                    isMenuOpen ? "bg-shade-background" : "bg-transparent"
                  }  overflow-hidden transition-all duration-300 ease-in-out rounded-2xl shadow-xs z-5000`}
                  style={{ height: `${menuHeight}px` }}
                >
                  {/* Header area clone for consistent styling */}
                  <div className="flex items-center gap-10 p-4">
                    <div className="ml-auto flex items-center gap-6">
                      <Link href="tel:+123456789">
                        <Image
                          src="/subtract.svg"
                          alt="call"
                          width={22}
                          height={20}
                        />
                      </Link>
                      <Link href="https://instagram.com">
                        <Image
                          src="/vector.svg"
                          alt="instagram"
                          width={22}
                          height={20}
                        />
                      </Link>
                      <Link href="mailto:info@example.com">
                        <Image
                          src="/intersect.svg"
                          alt="mail"
                          width={22}
                          height={20}
                        />
                      </Link>
                    </div>

                    <div
                      ref={menuExpanderIconRef}
                      className="inline-flex flex-col justify-center items-center cursor-pointer group group-hover:gap-4 gap-2.5"
                    >
                      <span className="block w-8 h-1 bg-black group-hover:bg-[#e56e53] transition-all duration-300 ease-in-out"></span>
                      <span className="block w-8 h-1 bg-[#e56e53] group-hover:bg-black transition-all duration-300 ease-in-out"></span>
                    </div>
                  </div>

                  {/* Menu items */}
                  <ul className="flex flex-col gap-4 rtl text-black font-normal text-xl px-6 py-4 text-left">
                    <li className="mt-10">
                      <Link href="#" className="block py-1">
                        مانيفستو بديل
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="block py-1">
                        بودكاست مُكالمة
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="block py-1">
                        عن بديل
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="block pt-1">
                        المتحدثون
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* SCENE 1 */}
      <div
        className="flex-grow flex flex-col justify-center h-screen"
        ref={sceneRef}
      >
        {["landing-page", "sceneOne"].includes(sceneStep) ? (
          <SceneOne
            sceneRef={sceneRef as React.RefObject<HTMLDivElement>}
            sceneStep={sceneStep}
            setSceneStep={setSceneStep}
            showStartTourButton={showStartTourButton}
            setShowStartTourButton={setShowStartTourButton}
            setShowIntroFooter={setShowIntroFooter}
            setShowScrollMouse={setShowScrollMouse}
          />
        ) : sceneStep === "sceneTwo" ? (
          <SceneTwo setSceneStep={setSceneStep} />
        ) : (
          <SceneThree setSceneStep={setSceneStep} />
        )}
      </div>

      {/* FOOTER OVERLAY */}
      {showIntroFooter && (
        <div className="fixed bottom-10 mx-auto w-[90%] flex justify-between items-center z-1000 text-[#56554A]">
          <Image
            src="/skip-intro-button.svg"
            className="cursor-pointer"
            alt="skip"
            width={120}
            height={30}
          />

          {/* Scroll Mouse */}
          {showScrollMouse && (
            <div className="flex justify-center items-center relative opacity-0 animate-fadeIn delay-[1200ms]">
              <Image
                className="relative"
                src="/mouse.svg"
                alt="mouse"
                width={30}
                height={30}
              />
              <Image
                className="absolute bottom-2 left-2.5 animate-scroll"
                src="/scroll.svg"
                alt="scroll"
                width={10}
                height={10}
              />
            </div>
          )}

          {/* Sound Button */}
          <Image
            src="/mute-button.svg"
            alt="sound"
            width={130}
            height={40}
            className="cursor-pointer"
          />
        </div>
      )}
    </div>
  );
}
