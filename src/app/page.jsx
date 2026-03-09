"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    number: "01",
    title: "Discover",
    desc: "We research and understand your goals, audience, and the landscape around your product.",
    bg: "bg-indigo-600",
  },
  {
    number: "02",
    title: "Design",
    desc: "Crafting beautiful, functional interfaces that feel natural and drive real engagement.",
    bg: "bg-violet-600",
  },
  {
    number: "03",
    title: "Develop",
    desc: "Turning designs into fast, accessible, production-ready code built to scale.",
    bg: "bg-fuchsia-600",
  },
  {
    number: "04",
    title: "Deliver",
    desc: "Shipping with confidence — tested, optimised, and ready for the world to use.",
    bg: "bg-pink-600",
  },
];

export default function Home() {
  const heroRef = useRef(null);
  const stackSectionRef = useRef(null);
  const cardsRef = useRef([]);
  const formSectionRef = useRef(null);
  const formCardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      heroRef.current.querySelectorAll(".hero-item"),
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 0.9, stagger: 0.2, ease: "power3.out" }
    );

    const cards = cardsRef.current;
    const totalCards = cards.length;

    cards.forEach((card, i) => {
      ScrollTrigger.create({
        trigger: card,
        start: "top top",
        end: () => `+=${(totalCards - i - 1) * window.innerHeight}`,
        pin: true,
        pinSpacing: false,
      });

      if (i < totalCards - 1) {
        gsap.to(card, {
          scale: 0.88,
          borderRadius: "24px",
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    });

    // Register form fade-up
    gsap.fromTo(
      formCardRef.current,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formSectionRef.current,
          start: "top 75%",
        },
      }
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <main>
      {/* Hero */}
      <section
        ref={heroRef}
        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 text-white px-6 text-center"
      >
        <p className="hero-item text-sm font-semibold tracking-widest uppercase text-indigo-200 mb-4">
          Welcome
        </p>
        <h1 className="hero-item text-5xl md:text-7xl font-bold leading-tight mb-6">
          Build something <br /> amazing today
        </h1>
        <p className="hero-item text-lg md:text-xl text-indigo-100 max-w-xl mb-10">
          A modern Next.js starter with Tailwind CSS and GSAP scroll animations,
          ready for your next big idea.
        </p>
        <a
          href="#register"
          className="hero-item inline-block bg-white text-indigo-700 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-indigo-50 transition"
        >
          Get Started
        </a>
      </section>

      {/* Stacking Cards */}
      <section ref={stackSectionRef} className="bg-gray-950">
        {CARDS.map((card, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className={`${card.bg} min-h-screen flex items-center justify-center px-8`}
          >
            <div className="max-w-2xl w-full text-white">
              <span className="text-8xl font-black opacity-20 leading-none block mb-4">
                {card.number}
              </span>
              <h2 className="text-5xl md:text-6xl font-bold mb-6">{card.title}</h2>
              <p className="text-xl md:text-2xl text-white/70 leading-relaxed max-w-lg">
                {card.desc}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Register */}
      <section
        id="register"
        ref={formSectionRef}
        className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-24"
      >
        <div ref={formCardRef} className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Create an account</h2>
          <p className="text-gray-500 mb-8">Sign up to get started for free.</p>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-2.5 rounded-lg hover:bg-indigo-700 transition"
            >
              Register
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            Already have an account?{" "}
            <a href="#" className="text-indigo-600 font-medium hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
