"use client";

import { useState } from "react";
import Link from "next/link";

const mainLinks = [
  {
    href: "/",
    label: "Home",
    sub: [{ href: "/", label: "Overview" }],
  },
  {
    href: "/showcase",
    label: "Showcase",
    sub: [
      { href: "/showcase", label: "All Work" },
      { href: "/showcase", label: "Featured" },
    ],
  },
  {
    href: "/contact",
    label: "Contact",
    sub: [
      { href: "/contact", label: "Get in Touch" },
      { href: "/contact", label: "Office" },
    ],
  },
];

const bottomLinks = [
  { href: "/", label: "News & Stories" },
  { href: "/", label: "Events" },
  { href: "/contact", label: "Contact Us" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-5 flex items-center justify-between">
        <Link href="/" className="text-white z-50">
          <img className="w-[160px]" src="/GP.png" alt="Logo" />
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
          className="hidden md:block w-[36%] h-full bg-cover bg-center transition-all duration-700"
          style={{
            backgroundImage: "url('/menu-bg.jpg')",
            transform: open ? "translateX(0)" : "translateX(-20px)",
            opacity: open ? 1 : 0,
            transition: `opacity 0.6s ease, transform 0.6s ease`,
            backgroundColor: "#1a2e1a",
          }}
        />

        {/* Right — dark green panel */}
        <div className="flex-1 bg-[#1e2e1e] flex flex-col">

          {/* Nav content — main links + sub links */}
          <div className="flex flex-1 overflow-hidden">

            {/* Main links */}
            <nav className="flex flex-col justify-center gap-1 px-10 md:px-16 flex-1 border-r border-white/10">
              {mainLinks.map(({ href, label }, i) => (
                <div
                  key={href}
                  className="flex items-center gap-4 group cursor-pointer"
                  onMouseEnter={() => setActiveIndex(i)}
                >
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className="text-[clamp(1.8rem,4vw,3.2rem)] font-serif font-normal uppercase tracking-wide text-white/80 hover:text-white transition-colors duration-200 leading-tight"
                    style={{
                      opacity: open ? 1 : 0,
                      transform: open ? "translateY(0)" : "translateY(16px)",
                      transition: `opacity 0.5s ease ${i * 80 + 100}ms, transform 0.5s ease ${i * 80 + 100}ms`,
                    }}
                  >
                    {label}
                  </Link>
                  {activeIndex === i && (
                    <span className="text-white/40 text-xl font-light leading-none mt-1">—</span>
                  )}
                </div>
              ))}
            </nav>

            {/* Sub links */}
            <div className="hidden md:flex flex-col justify-center px-10 w-[240px] gap-3">
              {mainLinks[activeIndex]?.sub.map(({ href, label }, i) => (
                <Link
                  key={i}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="text-sm tracking-[0.15em] uppercase text-emerald-400/80 hover:text-emerald-300 transition-colors duration-200"
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
            className="border-t border-white/10 px-10 md:px-16 py-5 flex flex-wrap gap-x-8 gap-y-3 items-center"
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
                className="text-[11px] tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors duration-200 flex items-center gap-1"
              >
                {label}
                <span className="text-xs">↗</span>
              </Link>
            ))}

            {/* Social */}
            <div className="ml-auto flex items-center gap-3">
              <span className="text-[11px] tracking-[0.2em] uppercase text-white/50">Follow Us</span>
              <a href="#" className="w-7 h-7 rounded-full border border-white/30 flex items-center justify-center text-white/60 hover:text-white hover:border-white transition text-xs">f</a>
              <a href="#" className="w-7 h-7 rounded-full border border-white/30 flex items-center justify-center text-white/60 hover:text-white hover:border-white transition text-xs">in</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
