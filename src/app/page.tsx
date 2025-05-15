"use client";

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Home() {
  const [showStartTourButton, setShowStartTourButton] = useState(true);
  const [showIntroFooter, setShowIntroFooter] = useState(false);
  const [showScrollMouse, setShowScrollMouse] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sceneRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstSaudiGuyRef = useRef<HTMLImageElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const menuExpanderIconRef = useRef<HTMLDivElement>(null);

  const [menuHeight, setMenuHeight] = useState(0);

  const playIconRef = useRef<HTMLDivElement>(null);

  // Measure the menu height for animations
  useEffect(() => {
    if (isMenuOpen && menuRef.current) {
      const height = menuRef.current.scrollHeight;
      setMenuHeight(height);
    } else {
      setMenuHeight(0);
    }
  }, [isMenuOpen]);

  //const nextSceneRef = useRef<HTMLDivElement>(null);

  const handleStartClick = () => {
    const tl = gsap.timeline();

    // Shrink the button first (starts immediately)
    tl.to(
      buttonRef.current,
      {
        width: 72,
        duration: 0.2,
        ease: "power2.inOut",
      },
      0
    );

    // Start text fade and scene zoom 100ms later
    tl.to(
      textRef.current,
      {
        y: -100,
        opacity: 0,
        scale: 0.9,
        duration: 0.7,
        onComplete: () => setShowStartTourButton(false),

        ease: "power2.inOut",
      },
      0
    );

    tl.to(
      sceneRef.current,
      {
        scale: 1.35,
        duration: 1.4,
        ease: "power2.inOut",
      },
      0
    );

    tl.fromTo(
      firstSaudiGuyRef.current,
      {
        opacity: 0,
        scale: 0.7,
      },
      {
        opacity: 1,
        scale: 0.95,
        duration: 0.8,
        ease: "power2.out",
        onStart: () => setShowIntroFooter(true),
        onComplete: () => {
          setTimeout(() => {
            setShowScrollMouse(true);
          }, 200);
        },
      },
      "-=0.7"
    );
  };

  const handleExpandMenuIcon = () => {
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
    <div className={`min-h-screen flex flex-col bg-background px-[5%] w-full `}>
      <Head>
        <title>مكالمة | Mukalamah</title>
        <meta name="description" content="منصتك لاكتشاف أفكار مبتكرة" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="pt-6">
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
                <div className="flex items-center  p-4 bg-transparent rounded-lg z-10 relative ">
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
                  }  overflow-hidden transition-all duration-300 ease-in-out rounded-2xl shadow-xs z-2000`}
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

      <div className="flex-grow flex flex-col justify-between" ref={sceneRef}>
        <main className="relative flex-grow flex items-center justify-center mb-5">
          {/* Background SVG */}
          <div className="absolute inset-0 flex items-center justify-center z-0 scale-100 transition-transform">
            <Image
              src="/waves-vector.svg"
              width={800}
              height={800}
              alt="bg-waves"
              className="h-[90dvh] w-[90dvw] object-contain"
            />
          </div>

          {/* Text content  */}
          <div
            className="absolute inset-0 z-10 flex-col flex items-center justify-center "
            ref={textRef}
          >
            <div className="text-center  mt-10 flex items-end relative">
              <h2
                className="text-lg md:text-5xl font-bold rtl text-black align-bottom "
                style={{ fontFamily: `"source-arabic-sans", sans-serif` }}
              >
                أهلاً بك في <span className="text-light-orange">مُكالمة،</span>
              </h2>

              <div className="absolute top-[80px] right-0 w-[100%] text-center font-[600] rtl">
                <p className="mb-1 ">منصتك لاكتشاف أفكار مبتكرة</p>
                <p>تلهم التغيير الإيجابي.</p>
              </div>
            </div>
          </div>

          <div className="mx-auto flex self-end ">
            {showStartTourButton && (
              <button
                ref={buttonRef}
                onClick={handleStartClick}
                className="cursor-pointer z-100 flex flex-row-reverse items-center overflow-hidden h-[48px] rounded-[20px] bg-[#e2ddbf] backdrop-blur-[13px] text-black px-1.5 transition-all duration-500"
              >
                {/* Play Icon - stays on right in RTL */}
                <div ref={playIconRef} className="flex-shrink-0">
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
          </div>

          <div
            ref={firstSaudiGuyRef}
            className="absolute right-20 inset-0 z-100 flex items-center justify-center scale-[0.9] opacity-0"
            style={{ transformOrigin: "center center" }}
          >
            {/* Wrapper that links guy + headphones */}
            <div className="relative w-[400px] h-[400px]">
              {/* Guy */}
              <Image
                src="/saudi-guy-1.svg"
                alt="Guy"
                fill
                className="object-contain relative z-10"
              />

              {/* Headphones - now positioned relative to guy */}
              <Image
                src="/headphone2.svg"
                alt="headphones"
                width={70}
                height={100}
                className="absolute top-[105px] right-[103px] z-20"
              />
            </div>
          </div>
        </main>

        <footer className="p-4 text-center text-sm flex gap-2 items-center mx-auto">
          <Image
            src="/headphones.svg"
            width={20}
            height={20}
            alt="headset-icon"
          />
          <p className="text-md mt-2 text-faded-black opacity-[50%]">
            ننصح باستخدام سماعات الرأس لتحقيق أفضل تجربة.{" "}
          </p>
        </footer>
      </div>

      {/* New Footer (not inside sceneRef anymore!) */}
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
            <div className="flex justify-center items-center relative opacity-0 animate-fadeIn delay-[800ms]">
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
