"use client";

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";

export default function Home() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const playIconRef = useRef<HTMLDivElement>(null);

  //const nextSceneRef = useRef<HTMLDivElement>(null);

  const handleStartClick = () => {
    const tl = gsap.timeline();

    // Shrink the button first (starts immediately)
    tl.to(
      buttonRef.current,
      {
        width: 70,
        duration: 0.3,
        ease: "sine.in",
      },
      0 // starts immediately
    );

    // Start text fade and scene zoom 100ms later
    tl.to(
      textRef.current,
      {
        y: -100,
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: "power2.inOut",
      },
      "+=0.1"
    );

    tl.to(
      sceneRef.current,
      {
        scale: 1.6,
        duration: 1.2,
        ease: "power2.inOut",
      },
      "-=1" // starts at the same time as textRef animation
    );
  };

  return (
    <div className={`min-h-screen flex flex-col bg-background`}>
      <Head>
        <title>مكالمة | Mukalamah</title>
        <meta name="description" content="منصتك لاكتشاف أفكار مبتكرة" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="pt-6 px-4">
        {/*Navbar section */}
        <div className=" w-full">
          {/* Logo and social media icons */}
          <div className=" w-[90%] mx-auto flex justify-between items-center">
            <div className="text-right">
              <Image
                src="/LOGO.svg"
                alt="Logo"
                width={142}
                height={40}
                priority
              />
            </div>

            <div className="flex justify-between gap-10">
              <div className="flex gap-5">
                <Link href="tel:+123456789" className=" z-10">
                  <Image
                    src="/subtract.svg"
                    alt="mail"
                    width={22}
                    height={20}
                    priority
                  />
                </Link>
                <Link href="https://instagram.com" className=" z-10">
                  <Image
                    src="/vector.svg"
                    alt="instagram"
                    width={22}
                    height={20}
                    priority
                  />
                </Link>
                <Link href="mailto:info@example.com" className=" z-10">
                  <Image
                    src="/intersect.svg"
                    alt="call"
                    width={22}
                    height={20}
                    priority
                  />
                </Link>
              </div>

              {/* nav menu */}
              <div className="group inline-flex flex-col justify-center  items-center delay-[20] transition-[gap] duration-300 ease-in-out gap-[6px] hover:gap-[10px] z-10">
                <span className="block w-8 h-1 bg-black transition-colors duration-100 ease-in-out group-hover:bg-[#e56e53]"></span>
                <span className="block w-8 h-1 bg-[#e56e53] transition-colors duration-100 ease-in-out group-hover:bg-black"></span>
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
    </div>
  );
}
