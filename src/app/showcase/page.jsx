"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import client from "../../lib/apolloClient";
import { gql } from "@apollo/client";

gsap.registerPlugin(ScrollTrigger);

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    number: "01",
    title: "Strategy",
    desc: "Laying the groundwork with research, roadmaps, and clear direction.",
    bg: "bg-sky-600",
  },
  {
    number: "02",
    title: "Branding",
    desc: "Building identity systems that are bold, memorable, and consistent.",
    bg: "bg-teal-600",
  },
  {
    number: "03",
    title: "Launch",
    desc: "Getting your product in front of the right people at the right time.",
    bg: "bg-emerald-600",
  },
  {
    number: "04",
    title: "Grow",
    desc: "Iterating on data and feedback to continually push performance forward.",
    bg: "bg-lime-600",
  },
];

export default function Showcase() {
  const heroRef = useRef(null);
  // Zoom section refs
  const zoomWrapRef = useRef(null);
  const zoomBoxRef = useRef(null);
  // Stacking cards
  const cardsRef = useRef([]);

  // WordPress posts state
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // ── Hero entrance ──────────────────────────────────────────
    gsap.fromTo(
      heroRef.current.querySelectorAll(".hero-item"),
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 0.9, stagger: 0.2, ease: "power3.out" }
    );

    // ── Container zoom to full screen ──────────────────────────
    gsap.timeline({
      scrollTrigger: {
        trigger: zoomWrapRef.current,
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: 1,
      },
    })
      .to(zoomBoxRef.current, {
        width: "100vw",
        height: "100vh",
        borderRadius: "0px",
        ease: "power2.inOut",
      })
      .to(
        zoomBoxRef.current.querySelectorAll(".zoom-item"),
        { opacity: 1, y: 0, stagger: 0.08, ease: "power2.out" },
        "-=0.3"
      );

    // ── Stacking cards ──
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

    // Fetch posts from WordPress
    client
      .query({
        query: gql`
          query {
            posts {
              nodes {
                id
                title
                excerpt
              }
            }
          }
        `,
      })
      .then((result) => setPosts(result.data.posts.nodes))
      .catch(() => setPosts([]));

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <main>
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-600 to-teal-600 text-white px-6 text-center"
      >
        <p className="hero-item text-sm font-semibold tracking-widest uppercase text-sky-200 mb-4">
          Showcase
        </p>
        <h1 className="hero-item text-5xl md:text-7xl font-bold leading-tight mb-6">
          See it in <br /> action
        </h1>
        <p className="hero-item text-lg md:text-xl text-sky-100 max-w-xl mb-10">
          Scroll down to experience the container zoom and stacking card
          animations powered by GSAP.
        </p>
        <a
          href="#zoom"
          className="hero-item inline-block bg-white text-sky-700 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-sky-50 transition"
        >
          Explore
        </a>
      </section>

      {/* ── Container Zoom ── */}
      <section
        id="zoom"
        ref={zoomWrapRef}
        className="min-h-screen bg-gray-950 flex items-center justify-center overflow-hidden"
      >
        <div
          ref={zoomBoxRef}
          className="bg-gradient-to-br from-sky-500 to-teal-500 flex flex-col items-center justify-center text-white overflow-hidden"
          style={{
            width: "72vw",
            height: "72vh",
            borderRadius: "32px",
          }}
        >
          <p
            className="zoom-item text-sm font-semibold tracking-widest uppercase text-sky-200 mb-4"
            style={{ opacity: 0, transform: "translateY(30px)" }}
          >
            Full screen
          </p>
          <h2
            className="zoom-item text-4xl md:text-6xl font-bold text-center leading-tight mb-4 px-6"
            style={{ opacity: 0, transform: "translateY(30px)" }}
          >
            Zoom into <br /> the experience
          </h2>
          <p
            className="zoom-item text-lg text-white/70 text-center max-w-md px-6"
            style={{ opacity: 0, transform: "translateY(30px)" }}
          >
            This container starts small and expands to fill the entire screen as
            you scroll through it.
          </p>
        </div>
      </section>

      {/* ── Stacking Cards ── */}
      <section className="bg-gray-950">
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

      {/* ── WordPress Posts Example ── */}
      <section className="bg-gray-950 py-12">
        <h2 className="text-3xl text-white font-bold mb-6 text-center">WordPress Posts</h2>
        <div className="max-w-2xl mx-auto space-y-8">
          {posts.length === 0 && (
            <p className="text-white/70 text-center">No posts found or unable to fetch data.</p>
          )}
          {posts.map((post) => (
            <div key={post.id} className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-2xl font-semibold text-white mb-2">{post.title}</h3>
              <div
                className="text-white/80"
                dangerouslySetInnerHTML={{ __html: post.excerpt }}
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
