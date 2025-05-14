"use client";

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
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

      <main className="relative flex-grow flex items-center justify-center mb-5">
        {/* Background SVG */}
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <Image
            src="/waves-vector.svg"
            width={800}
            height={800}
            alt="bg-waves"
            className="h-[90dvh] w-[90dvw] object-contain"
          />
        </div>

        {/* Text content  */}
        <div className="absolute inset-0 z-10 flex-col flex items-center justify-center ">
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
          <button className=" gap-2 md:min-w-[230px] backdrop-blur-[13px] cursor-pointer z-100 flex items-center justify-between font-bold h-[48px] rounded-[20px] bg-[#e2ddbf] pl-1 pr-4 py-1 text-black w-full max-w-[320px]">
            {/* Centered Text */}
            <div className="flex-grow text-center  ">
              <h3 className="text-lg">ابــــــــدأ التجربة</h3>
            </div>

            <div className="flex-shrink-0  ">
              <Image
                src="/play-icon.svg"
                width={60}
                height={40}
                alt="play-icon"
              />
            </div>
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
  );
}
