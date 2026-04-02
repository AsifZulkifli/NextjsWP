"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import client from "../lib/apolloClient";
import { gql } from "@apollo/client";

gsap.registerPlugin(ScrollTrigger);

const GET_HOME_DATA = gql`
  query GetHomeData {
    page(id: "home", idType: URI) {
      id
      homeSettings {
        heroVideo {
          node {
            mediaItemUrl
            mimeType
          }
        }
      }
    }
  }
`;

export default function Home() {
  const heroRef = useRef(null);
  const revealRef = useRef(null);
  const sidesRef = useRef(null);
  const topImgRef = useRef(null);
  const leftImgRef = useRef(null);
  const rightImgRef = useRef(null);
  const bottomImgRef = useRef(null);
  const centerImgRef = useRef(null);
  const revealTextRef = useRef(null);
  const uspRef = useRef(null);

  const [heroVideo, setHeroVideo] = useState(null);
  const [heroVideoType, setHeroVideoType] = useState("video/mp4");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(0);
  const dropdownRef = useRef(null);

  const searchOptions = [
    {
      label: "Homes",
      icon: (
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.5219 7.3294L9.77188 0.141796C9.54064 -0.0472655 9.20938 -0.0472655 8.97812 0.141796L0.228123 7.3294C-0.0390573 7.54816 -0.0765573 7.9419 0.142185 8.20907C0.360927 8.47626 0.754685 8.51376 1.02186 8.29501L2.18748 7.33719V16.8748C2.18748 17.9092 3.0281 18.7498 4.06248 18.7498H6.87488V13.4374C6.87488 12.0562 7.99364 10.9374 9.37488 10.9374C10.7561 10.9374 11.8749 12.0562 11.8749 13.4374V18.7498H14.6873C15.7217 18.7498 16.5623 17.9092 16.5623 16.8748V7.33719L17.7279 8.29501C17.8435 8.39033 17.9841 8.4372 18.1248 8.4372C18.306 8.4372 18.4842 8.35908 18.6076 8.20908C18.8264 7.9419 18.7889 7.54814 18.5217 7.3294L18.5219 7.3294Z" fill="#42B58B"/>
        </svg>  
      ),
    },
    {
      label: "Commercial",
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.1112 0C15.1112 0 15.1456 0.0408001 15.2 0.1176C15.4248 0.4296 16 1.3336 16 2.3992C16 3.0712 15.6936 3.6776 15.2 4.1128C14.6822 4.56126 14.0186 4.80557 13.3336 4.8C12.7695 4.80286 12.2172 4.63862 11.7464 4.328C11.0912 3.8912 10.6664 3.1904 10.6664 2.4C10.6664 3.1904 10.2424 3.8912 9.5864 4.328C9.1432 4.624 8.5944 4.8 8 4.8C7.43593 4.80286 6.88365 4.63862 6.4128 4.328C5.7576 3.8912 5.3328 3.1904 5.3328 2.4C5.3328 3.1904 4.9088 3.8912 4.2528 4.328C3.8096 4.624 3.2608 4.8 2.6664 4.8C1.98129 4.80535 1.31772 4.56075 0.8 4.112C0.3064 3.6776 0 3.0704 0 2.4C0 1.3344 0.5752 0.4312 0.8 0.1184C0.8552 0.0416 0.8888 0.000799942 0.8888 0.000799942L15.1112 0ZM13.3336 6.3992C13.9832 6.3992 14.6216 6.2552 15.2 5.9912V14.3968H16V16H11.6V9.6H4.4V16H0V14.3968H0.8V5.992C1.38562 6.26034 2.02223 6.39923 2.6664 6.3992C3.6344 6.3992 4.58 6.0792 5.3328 5.52C6.10534 6.09012 7.03986 6.39845 8 6.4C8.968 6.4 9.9136 6.08 10.6664 5.5208C11.439 6.09064 12.3736 6.39869 13.3336 6.4" fill="#42B58B"/>
        <path d="M6 16.0002V11.2002H10V16.0002H6Z" fill="#42B58B"/>
        </svg>
      ),
    },
    {
      label: "Leasing",
      icon: (
        <svg width="19" height="22" viewBox="0 0 19 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.9573 12.2962L18.7885 17.0841H18.7895C19.0522 17.5289 18.8552 18.0866 18.3975 18.3441V18.3451L12.1575 21.8638C11.6946 22.1254 11.0859 22.0053 10.8326 21.5462C10.8326 21.5462 10.8326 21.5452 10.8315 21.5452L8.45791 17.531C8.44957 17.5167 8.43498 17.5086 8.41726 17.5086H4.16107C3.54915 17.5086 3.04878 17.02 3.04878 16.4226V8.55775C3.04878 8.54553 3.05295 8.53434 3.06234 8.52518L9.10544 2.62475C9.32226 2.41304 9.67668 2.41304 9.89351 2.62475L15.9366 8.52518C15.946 8.53434 15.9502 8.54451 15.9502 8.55775V12.2739C15.9512 12.282 15.9531 12.2891 15.9573 12.2962ZM12.8633 13.14C11.258 13.14 9.95584 14.4113 9.95584 15.9789C9.95584 17.5464 11.2578 18.8177 12.8633 18.8177C14.4686 18.8177 15.7708 17.5464 15.7708 15.9789C15.7708 14.4113 14.4688 13.14 12.8633 13.14ZM14.3686 17.5941L14.526 17.4363C14.5927 17.303 14.5687 17.1371 14.4551 17.0251L13.2448 15.8434C13.2354 15.8343 13.2313 15.8241 13.2313 15.8108V14.2465C13.2313 14.048 13.0666 13.8872 12.8633 13.8872C12.66 13.8872 12.4953 14.048 12.4953 14.2465V15.9788C12.4953 16.0795 12.537 16.1701 12.6058 16.2353L13.936 17.534C14.0496 17.645 14.2195 17.6684 14.3571 17.6032C14.3613 17.6002 14.3644 17.5981 14.3686 17.5941ZM10.2853 10.623C9.63899 10.454 9.11882 11.137 9.44616 11.6907C9.77245 12.2424 10.6387 12.1416 10.8107 11.5136C10.917 11.1248 10.6835 10.7268 10.2853 10.623ZM10.3895 2.14248L17.5156 9.10027C18.0545 9.62648 19 9.26414 19 8.49874C19 8.28092 18.9156 8.06209 18.7467 7.8972L18.7477 7.89619L11.4477 0.787793C10.3688 -0.262585 8.61336 -0.263627 7.53444 0.790846L0.25416 7.8982C-0.284769 8.4244 0.0863271 9.34757 0.870238 9.34757C1.09332 9.34757 1.31641 9.26513 1.48632 9.10024L8.61235 2.14245C9.10228 1.66409 9.89959 1.66412 10.3895 2.14248ZM9.20951 8.75216L9.34294 9.4056C9.3492 9.43715 9.32105 9.46463 9.28874 9.45954C9.19387 9.44224 9.11465 9.43715 9.00623 9.4972V9.49618C8.93118 9.53995 8.8728 9.60102 8.84361 9.68041L7.4009 13.6866C7.305 13.9532 7.31542 14.2087 7.45928 14.4509H7.45824L11.459 21.2154C11.5205 21.3192 11.6873 21.3263 11.7999 21.2602L18.041 17.7436V17.7446C18.1557 17.6805 18.2339 17.537 18.1724 17.4332H18.1734L14.1726 10.6677C14.0277 10.4234 13.8119 10.2881 13.5242 10.2362L10.1289 9.61427C10.1102 9.61122 10.0956 9.59697 10.0914 9.57865L9.79637 8.13537C9.7922 8.11603 9.80054 8.09771 9.81826 8.08754C10.4416 7.72113 10.5563 6.87431 10.034 6.36538C9.3252 5.67327 8.10869 6.1669 8.10869 7.14401C8.10869 7.69466 8.52358 8.15471 9.07086 8.23308C9.09066 8.23614 9.1063 8.25039 9.10943 8.26973L9.20951 8.75216Z" fill="#42B58B"/>
        </svg>
      ),
    },
  ];

  useEffect(() => {
    if (!revealRef.current) return;

    const ctx = gsap.context(() => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      // Scale so the center image (395×190) fills the viewport
      const fillScale = Math.max(vw / 395, vh / 190) * 1.1;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: revealRef.current,
          start: "top top",
          end: "+=600%",
          pin: true,
          scrub: 2,
        },
      });

      // Phase 1 (0→3): all 5 scale identically; surrounding 4 also translate off-screen
      tl.to(centerImgRef.current, { scale: fillScale, ease: "power2.inOut", duration: 3 }, 0)
        .to(topImgRef.current,    { scale: fillScale, y: -vh, ease: "power2.inOut", duration: 3 }, 0)
        .to(bottomImgRef.current, { scale: fillScale, y:  vh, ease: "power2.inOut", duration: 3 }, 0)
        .to(leftImgRef.current,   { scale: fillScale, x: -vw, ease: "power2.inOut", duration: 3 }, 0)
        .to(rightImgRef.current,  { scale: fillScale, x:  vw, ease: "power2.inOut", duration: 3 }, 0)

      // Phase 2 (3.5→4.5): heading + subheading fade in
        .to(revealTextRef.current, { opacity: 1, duration: 1 }, 3.5)

      // Phase 3 (5→6): text hides, USPs appear
        .to(revealTextRef.current, { opacity: 0, duration: 1 }, 5)
        .to(uspRef.current, { opacity: 1, duration: 1 }, 5.5);
    }, revealRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    client
      .query({ query: GET_HOME_DATA, fetchPolicy: "no-cache" })
      .then((result) => {
        const wpHeroVideo =
          result?.data?.page?.homeSettings?.heroVideo?.node?.mediaItemUrl || null;
        const wpHeroVideoType =
          result?.data?.page?.homeSettings?.heroVideo?.node?.mimeType || "video/mp4";
        setHeroVideo(wpHeroVideo);
        setHeroVideoType(wpHeroVideoType);
      })
      .catch((error) => {
        console.error("GraphQL fetch error:", error);
      });
  }, []);

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[85vh] w-full">
        {heroVideo ? (
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
            <source src={heroVideo} type={heroVideoType} />
          </video>
        ) : (
          <div className="absolute inset-0 bg-black" />
        )}

        <div className="absolute inset-0 bg-black/45" />

        <div
          ref={heroRef}
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
        >
          <div className="hero-item flex flex-col items-center">
            <p className="font-maharlika text-[50px] 3xl:text-[60px] font-light uppercase text-white leading-none">
              In A Garden Where
            </p>
            <p className="font-maharlika text-[80px] 3xl:text-[90px] font-light uppercase text-white leading-none">
              Happiness Lives.
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="absolute bottom-0 translate-y-1/2 left-0 right-0 z-20 flex justify-center px-6">
          <div className="flex items-center bg-white rounded-full shadow-xl px-6 py-3 gap-4">
            <span className="font-markpro text-[20px] whitespace-nowrap">I'm Looking for</span>

            {/* Custom dropdown — floats over bar, looks connected */}
            <div ref={dropdownRef} className="relative flex-1 z-50 w-[250px]">
              {/* Trigger — bar height never changes */}
              <button
                onClick={() => setDropdownOpen((o) => !o)}
                className="w-full flex items-center gap-2 bg-[#EFF7F4] px-4 py-2 rounded-3xl cursor-pointer"
              >
                <span className="text-[#42B58B]">{searchOptions[selectedOption].icon}</span>
                <span className="flex-1 font-markpro text-[18px] text-left">{searchOptions[selectedOption].label}</span>
                <svg
                  className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Options — float upward, option 0 sits exactly on top of the trigger */}
              {dropdownOpen && (
                <div
                  className="absolute left-0 w-full bg-[#EFF7F4] rounded-3xl overflow-hidden shadow-md"
                  style={{ top: 0 }}
                >
                  {searchOptions.map((opt, i) => (
                    <button
                      key={opt.label}
                      onClick={() => { setSelectedOption(i); setDropdownOpen(false); }}
                      className={`w-full flex items-center gap-2 px-4 py-2 font-markpro text-[18px] text-gray-700 hover:bg-[#dff0e9] transition-colors ${i < searchOptions.length - 1 ? "border-b border-gray-200" : ""}`}
                    >
                      <span className="text-[#42B58B]">{opt.icon}</span>
                      <span className="flex-1 text-left">{opt.label}</span>
                      {i === 0 && (
                        <svg className="w-4 h-4 text-gray-400 flex-shrink-0 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="bg-[#42B58B] font-markpro text-white text-[18px] uppercase tracking-widest px-6 py-2.5 rounded-full flex justify-center items-center gap-2 hover:bg-[#38a07a] transition-colors">
              Search
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Scroll Reveal Section */}
      <section
        ref={revealRef}
        className="relative h-screen overflow-hidden bg-gradient-to-b from-white to-[#abdecb]"
      >
        {/* 4 surrounding images — all 395×190px, 20px equal gap from center */}
        <div ref={sidesRef} className="absolute inset-0">
          {/* Top center: bottom edge is 20px above center top edge */}
          <div ref={topImgRef} className="absolute overflow-hidden" style={{ width: "395px", height: "190px", top: "calc(50% - 305px)", left: "calc(50% - 197.5px)" }}>
            <img src="homepage/onscroll-t.jpg" alt="" className="w-full h-full object-cover opacity-70" />
          </div>
          {/* Left: right edge is 20px left of center left edge */}
          <div ref={leftImgRef} className="absolute overflow-hidden" style={{ width: "395px", height: "190px", top: "calc(50% - 95px)", left: "calc(50% - 612.5px)" }}>
            <img src="homepage/onscroll-l.jpg" alt="" className="w-full h-full object-cover opacity-50" />
          </div>
          {/* Right: left edge is 20px right of center right edge */}
          <div ref={rightImgRef} className="absolute overflow-hidden" style={{ width: "395px", height: "190px", top: "calc(50% - 95px)", left: "calc(50% + 217.5px)" }}>
            <img src="homepage/onscroll-r.jpg" alt="" className="w-full h-full object-cover opacity-50" />
          </div>
          {/* Bottom center: top edge is 20px below center bottom edge */}
          <div ref={bottomImgRef} className="absolute overflow-hidden" style={{ width: "395px", height: "190px", top: "calc(50% + 115px)", left: "calc(50% - 197.5px)" }}>
            <img src="homepage/onscroll-b.jpg" alt="" className="w-full h-full object-cover opacity-70" />
          </div>
        </div>

        {/* Center image — 395×190px, zooms to fill screen */}
        <div
          ref={centerImgRef}
          className="absolute overflow-hidden"
          style={{ width: "395px", height: "190px", top: "calc(50% - 95px)", left: "calc(50% - 197.5px)" }}
        >
          <img src="homepage/onscroll-bg.jpg" alt="" className="w-full h-full object-cover" />
        </div>

        {/* Phase 2: Heading + subheading */}
        <div
          ref={revealTextRef}
          className="w-full absolute top-20 flex flex-col items-center justify-center z-10 opacity-0 pointer-events-none gap-4"
        >
          <h2 className="font-maharlika text-[#194A1D] text-[55px] leading-none text-center">
            Where Nature Shapes <br></br>Everyday Living
          </h2>
          <p className="font-markpro text-black text-[18px] mt-4 text-center max-w-2xl">
            Embrace the outdoors with a pet-friendly Central Park,<br></br> serene cascading lakes, and breathtaking waterfalls at the<br></br> heart of the community.
          </p>
        </div>

        {/* Phase 3: USPs */}
        <div
          ref={uspRef}
          className="w-full absolute top-20 flex items-start justify-center gap-6 z-10 opacity-0 pointer-events-none"
        >
          {[
            { icon: "/homepage/gif/pet.gif", label: "50-acre <br>Pet-Friendly <br>Central Park" },
            { icon: "/homepage/gif/lakes.gif", label: "5 Serene <br>Cascading <br>Lakes" },
            { icon: "/homepage/gif/waterfall.gif", label: "2 Breathtaking <br>Waterfall" },
          ].map(({ icon, label }) => (
            <div key={label} className="flex w-[18%] flex-col items-center gap-4">
              <div className="w-[7.5rem] h-[7.5rem] bg-[#42B58B] rounded-full flex items-center justify-center overflow-hidden p-7">
                <img src={icon} alt={label} className="w-full h-full object-contain" />
              </div>
              <span className="w-[60%] font-markpro font-bold text-[#194A1D] text-[18px] uppercase tracking-tight leading-tight text-center" dangerouslySetInnerHTML={{ __html: label }} />
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}