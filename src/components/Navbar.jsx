"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// const mainLinks = [
//   {
//     href: "/",
//     label: "Homepage",
//     sub: [{ href: "/", label: "Overview" }],
//   },
//   {
//     href: "/township",
//     label: "Township",
//     sub: [
//       { href: "/township", label: "Overview" },
//       { href: "/township", label: "Features" },
//     ],
//   },

//     {
//     href: "/homes",
//     label: "Homes",
//     sub: [
//       { href: "/township", label: "Overview" },
//       { href: "/township", label: "Features" },
//     ],
//   },
//     {
//     href: "/event_system",
//     label: "Event System",
//     sub: [
//       { href: "/township", label: "Overview" },
//       { href: "/township", label: "Features" },
//     ],
//   },
//   // {
//   //   href: "/showcase",
//   //   label: "Showcase",
//   //   sub: [
//   //     { href: "/showcase"},
//   //     { href: "/showcase"},
//   //   ],
//   // },
//   //   {
//   //   href: "/the-clove",
//   //   label: "The Clove",
//   //   sub: [
//   //     { href: "/the-clove", label: "Overview" },
//   //     { href: "/the-clove", label: "Features" },
//   //   ],
//   // },
//   // {
//   //   href: "/contact",
//   //   label: "Contact",
//   //   sub: [
//   //     { href: "/contact", label: "Get in Touch" },
//   //     { href: "/contact", label: "Office" },
//   //   ],
//   // },
// ];

const mainLinks = [
  {
    href: "/",
    label: "Homepage",
    sub: [
      { href: "/", label: "Gamuda Gardens" },      
      { href: "/showcase", label: "Gardens Park" },
    ],
  },
  {
    href: "/homes",
    label: "Homes",
    sub: [
      { href: "/showcase", label: "All Work" },
      { href: "/showcase", label: "Featured" },
    ],
  },
    {
    href: "/township",
    label: "Township",
    sub: [
      { href: "/Township", label: "Overview" },
      { href: "/the-clove", label: "Features" },
    ],
  },
  {
    href: "/Leisure & Lifestyle",
    label: "Leisure & Lifestyle",
    sub: [
      { href: "/contact", label: "Get in Touch" },
      { href: "/contact", label: "Office" },
    ],
  },
    {
    href: "/amenities",
    label: "Amenities",
    sub: [
      { href: "/contact", label: "Get in Touch" },
      { href: "/contact", label: "Office" },
    ],
  },
    {
    href: "/location",
    label: "Location",
    sub: [
      { href: "/contact", label: "Get in Touch" },
      { href: "/contact", label: "Office" },
    ],
  },

      {
    href: "/event_system",
    label: "Event",
    sub: [
      { href: "/contact", label: "Get in Touch" },
      { href: "/contact", label: "Office" },
    ],
  },


  // {
  //   href: "/event_system",
  //   label: "Event",
  //   sub: [], // Removed the two "/township" sub-items
  // },
  // {
  //   href: "/showcase",
  //   label: "Showcase",
  //   sub: [
  //     { href: "/showcase"},
  //     { href: "/showcase"},
  //   ],
  // },
  //   {
  //   href: "/the-clove",
  //   label: "The Clove",
  //   sub: [
  //     { href: "/the-clove", label: "Overview" },
  //     { href: "/the-clove", label: "Features" },
  //   ],
  // },
  // {
  //   href: "/contact",
  //   label: "Contact",
  //   sub: [
  //     { href: "/contact", label: "Get in Touch" },
  //     { href: "/contact", label: "Office" },
  //   ],
  // },
];

const bottomLinks = [
  { href: "/", label: "News & Stories" },
  { href: "/", label: "Events" },
  { href: "/contact", label: "Contact Us" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const pathname = usePathname();

  return (
    <>
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 flex items-center justify-between transition-all duration-300 py-5">
        <Link href="/" className="text-white z-50">
          <img className={`${open ? "w-[0px]" : "w-[120px]"}`} src="/gg-logo.png" alt="Logo" />
        </Link>

        {/* Hamburger */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="z-50 flex flex-col gap-[5px]"
          aria-label="Toggle menu"
        >
          <span className={`block h-[1.5px] bg-white transition-all duration-300 origin-center ${open ? "w-6 rotate-45 translate-y-[6.5px]" : "w-6"}`} />
          <span className={`block h-[1.5px] bg-white transition-all duration-300 ${open ? "w-0 opacity-0" : "w-4"}`} />
          <span className={`block h-[1.5px] bg-white transition-all duration-300 origin-center ${open ? "w-6 -rotate-45 -translate-y-[6.5px]" : "w-6"}`} />
        </button>
      </header>

      {/* Menu overlay */}
      <div
        className={`fixed inset-0 z-40 flex transition-all duration-500 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Left — image panel */}
        <div
          className="hidden md:block w-[34%] h-full bg-cover bg-center transition-all duration-700"
          style={{
            backgroundImage: "url('/menu-img.png')",
            transform: open ? "translateX(0)" : "translateX(-20px)",
            opacity: open ? 1 : 0,
            transition: `opacity 0.6s ease, transform 0.6s ease`,
            backgroundColor: "#1a2e1a",
          }}
        />

        {/* Right — dark green panel */}
        <div className="flex-1 bg-[#263427] flex flex-col">

          {/* Nav content — main links + sub links */}
          <div className="flex flex-1 overflow-hidden pt-10">

            {/* Main links */}
            <nav className="flex flex-col justify-center gap-1 px-10 md:px-20 flex-1 border-r border-white/10">
              {mainLinks.map(({ href, label }, i) => (
                <div
                  key={label}
                  className="flex items-center gap-4 group cursor-pointer"
                  onMouseEnter={() => setActiveIndex(i)}
                >
                  {href ? (
                    <Link
                      href={href}
                      onClick={() => setOpen(false)}
                      className="text-[36px] 3xl:text-[50px] py-4 font-maharlika font-normal uppercase tracking-wide text-white transition-colors duration-200 leading-tight"
                      style={{
                        opacity: open ? 1 : 0,
                        transform: open ? "translateY(0)" : "translateY(16px)",
                        transition: `opacity 0.5s ease ${i * 80 + 100}ms, transform 0.5s ease ${i * 80 + 100}ms`,
                      }}
                    >
                      {label}
                    </Link>
                  ) : (
                    <span
                      className="text-[36px] 3xl:text-[50px] py-4 font-maharlika font-normal uppercase tracking-wide text-white transition-colors duration-200 leading-tight"
                      style={{
                        opacity: open ? 1 : 0,
                        transform: open ? "translateY(0)" : "translateY(16px)",
                        transition: `opacity 0.5s ease ${i * 80 + 100}ms, transform 0.5s ease ${i * 80 + 100}ms`,
                      }}
                    >
                      {label}
                    </span>
                  )}
                  {activeIndex === i && (
                    <span className="text-white text-[30px] font-bold leading-none">—</span>
                  )}
                </div>
              ))}
            </nav>

            {/* Sub links */}
            <div className="hidden md:flex flex-col justify-start px-10 pt-[3%] w-[35%] gap-3">
              {mainLinks[activeIndex]?.sub.map(({ href, label }, i) => (
                <Link
                  key={i}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`font-markpro text-[20px] 3xl:text-[24px] py-2 uppercase transition-colors duration-200 ${pathname === href ? "text-[#42B58B]" : "text-white/40 hover:text-white/70"}`}
                  style={{
                    opacity: open ? 1 : 0,
                    transition: `opacity 0.4s ease ${i * 60 + 300}ms`,
                  }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom strip */}
          <div
            className="border-t border-white/10 md:mx-20 py-12 flex flex-wrap gap-x-2 gap-y-3 items-center"
            style={{
              opacity: open ? 1 : 0,
              transition: "opacity 0.5s ease 400ms",
            }}
          >
            {bottomLinks.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className="font-markpro text-[17px] 3xl:text-[24px] uppercase text-white bg-[#252E1D] rounded-[30px] py-2 px-4  hover:scale-105 transition-all duration-300 flex items-center gap-1"
              >
                {label}
                <span className="text-[20px]">↗</span>
              </Link>
            ))}

            {/* Social */}
            <div className="flex items-center gap-1 bg-[#252E1D] rounded-full pl-4 pr-2 hover:scale-105 transition-all duration-300">
              <span className="font-markpro text-[17px] 3xl:text-[24px] uppercase text-white rounded-[30px] py-2">Follow Us</span>
              <a href="#" className="w-10 h-10 flex rounded-full items-center justify-center text-white text-sm hover:scale-105 transition-all duration-300">
                <img src="icons/fb.svg"></img>
              </a>
              <a href="#" className="w-10 h-10 flex rounded-full items-center justify-center text-white text-sm hover:scale-105 transition-all duration-300">
                <img src="icons/ig.svg"></img>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
