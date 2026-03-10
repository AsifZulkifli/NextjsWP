// "use client";

// import { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const CARDS = [
//   {
//     title: "Park Connector",
//     subtitle: "1KM-Long Linkage",
//     subtitleSuffix: "to the Heart of the City",
//     desc: "The Park Connector seamlessly links you to a vibrant community, lush green spaces, and modern amenities — now just 1km closer to you.",
//     img: "/menu-bg.jpg",
//     label: "Actual Photo",
//   },
//   {
//     title: "Green Sanctuary",
//     subtitle: "50 Acres",
//     subtitleSuffix: "of Landscaped Parkland",
//     desc: "Immerse yourself in a curated landscape of walking trails, water features, and native flora — a living, breathing sanctuary on your doorstep.",
//     img: "/menu-bg.jpg",
//     label: "Artist Impression",
//   },
//   {
//     title: "Modern Living",
//     subtitle: "World-Class",
//     subtitleSuffix: "Amenities & Facilities",
//     desc: "From clubhouses to sports courts, every detail is designed to elevate everyday life and bring the community together.",
//     img: "/menu-bg.jpg",
//     label: "Artist Impression",
//   },
// ];

// export default function Home() {
//   const heroRef = useRef(null);
//   const stackWrapRef = useRef(null);
//   const cardEls = useRef([]);
//   const formSectionRef = useRef(null);
//   const formCardRef = useRef(null);

//   useEffect(() => {
//     gsap.fromTo(
//       heroRef.current.querySelectorAll(".hero-item"),
//       { opacity: 0, y: 40 },
//       { opacity: 1, y: 0, duration: 1.1, stagger: 0.18, ease: "power3.out", delay: 0.3 }
//     );

//     const totalCards = CARDS.length;
//     const scrollPerCard = window.innerHeight;

//     cardEls.current.forEach((el, i) => {
//       if (!el) return;
//       gsap.set(el, {
//         y: i === 0 ? 0 : "100vh",
//         scale: 1,
//         zIndex: i,
//       });
//     });

//     const tl = gsap.timeline({ paused: true });

//     for (let i = 1; i < totalCards; i++) {
//       tl.to(cardEls.current[i], { y: 0, ease: "power2.out" }, (i - 1));
//       tl.to(cardEls.current[i - 1], { scale: 0.94, ease: "power2.out" }, (i - 1));
//     }

//     ScrollTrigger.create({
//       trigger: stackWrapRef.current,
//       start: "top top",
//       end: `+=${scrollPerCard * (totalCards - 1)}`,
//       pin: true,
//       pinSpacing: true,
//       scrub: 0.8,
//       animation: tl,
//     });

//     gsap.fromTo(
//       formCardRef.current,
//       { opacity: 0, y: 80 },
//       {
//         opacity: 1,
//         y: 0,
//         duration: 0.8,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: formSectionRef.current,
//           start: "top 75%",
//         },
//       }
//     );

//     return () => ScrollTrigger.getAll().forEach((t) => t.kill());
//   }, []);

//   return (
//     <main>
//       {/* Hero */}
//       <section className="relative h-screen w-full overflow-hidden">
//         <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
//           <source src="/hero.mp4" type="video/mp4" />
//         </video>
//         <div className="absolute inset-0 bg-black/45" />
//         <div ref={heroRef} className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
//           <img className="w-[25vw]" src="/GP.png" alt="Logo" />
//           <div className="hero-item flex flex-col items-center gap-3">
//             <p className="text-[clamp(2rem,2.5vw,3.5rem)] font-light uppercase text-white/80">
//               Where Life Find Balance
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Stacking Feature Cards (contained, centered) */}
//       <section
//         ref={stackWrapRef}
//         className="bg-[#f0ebe3] flex items-center justify-center min-h-screen px-6 py-16"
//       >
//         <div className="relative w-[70%]" style={{ height: "62vh" }}>
//           {CARDS.map((card, i) => (
//             <div
//               key={i}
//               ref={(el) => (cardEls.current[i] = el)}
//               className="absolute inset-0 flex rounded-tl-[130px] rounded-br-[130px] overflow-hidden shadow-xl"
//               style={{ zIndex: i }}
//             >
//               {/* Left — image */}
//               <div className="relative w-[52%] flex-shrink-0">
//                 <img
//                   src={card.img}
//                   alt={card.title}
//                   className="w-full h-full object-cover"
//                   style={{ backgroundColor: "#2d4a2d" }}
//                 />
//                 {/* Fallback tinted bg if image missing */}
//                 <div className="absolute inset-0 bg-[#3a5a3a]/30" />
//                 <span className="absolute bottom-4 left-4 text-white/70 text-xs tracking-widest uppercase">
//                   {card.label}
//                 </span>
//               </div>

//               {/* Right — content */}
//               <div className="flex-1 bg-[#2c4a30] flex flex-col justify-center px-10 py-10 text-white">
//                 <h2 className="font-serif text-[clamp(1.6rem,3vw,2.8rem)] font-light uppercase tracking-wide leading-tight mb-3">
//                   {card.title}
//                 </h2>
//                 <p className="text-sm font-semibold mb-1">
//                   <span className="font-bold">{card.subtitle}</span>
//                   {" "}
//                   <span className="font-light opacity-80">{card.subtitleSuffix}</span>
//                 </p>

//                 {/* Decorative divider */}
//                 <div className="flex items-center gap-3 my-5">
//                   <span className="flex-1 h-px bg-white/20" />
//                 </div>

//                 <p className="text-sm md:text-base text-white/70 leading-relaxed">
//                   {card.desc}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Register */}
//       <section
//         id="register"
//         ref={formSectionRef}
//         className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-24"
//       >
//         <div ref={formCardRef} className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10">
//           <h2 className="text-3xl font-bold text-gray-800 mb-2">Create an account</h2>
//           <p className="text-gray-500 mb-8">Sign up to get started for free.</p>

//           <form className="space-y-5">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//               <input type="text" placeholder="John Doe" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
//               <input type="email" placeholder="john@example.com" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//               <input type="password" placeholder="••••••••" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//             </div>
//             <button type="submit" className="w-full bg-indigo-600 text-white font-semibold py-2.5 rounded-lg hover:bg-indigo-700 transition">
//               Register
//             </button>
//           </form>

//           <p className="text-center text-sm text-gray-400 mt-6">
//             Already have an account?{" "}
//             <a href="#" className="text-indigo-600 font-medium hover:underline">Sign in</a>
//           </p>
//         </div>
//       </section>
//     </main>
//   );
// }


"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import client from "../lib/apolloClient";
import { gql } from "@apollo/client";

gsap.registerPlugin(ScrollTrigger);

const GET_HOME_DATA = gql`
  query GetHomeData {
    showcaseCards(first: 20, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        id
        title
        content
        showcaseCardFields {
          number
          subtitle
          subtitleSuffix
          label
          background
          image {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  }
`;

export default function Home() {
  const heroRef = useRef(null);
  const stackWrapRef = useRef(null);
  const cardEls = useRef([]);
  const formSectionRef = useRef(null);
  const formCardRef = useRef(null);

  const [cards, setCards] = useState([]);

  useEffect(() => {
    client
      .query({
        query: GET_HOME_DATA,
        fetchPolicy: "no-cache",
      })
      .then((result) => {
        const fetchedCards = result?.data?.showcaseCards?.nodes || [];
        setCards(fetchedCards);
      })
      .catch((error) => {
        console.error("GraphQL fetch error:", error);
        setCards([]);
      });
  }, []);

  useEffect(() => {
    if (!heroRef.current || !stackWrapRef.current || !formSectionRef.current || !formCardRef.current) {
      return;
    }

    gsap.fromTo(
      heroRef.current.querySelectorAll(".hero-item"),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        stagger: 0.18,
        ease: "power3.out",
        delay: 0.3,
      }
    );

    if (cards.length > 0) {
      const totalCards = cards.length;
      const scrollPerCard = window.innerHeight;

      cardEls.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, {
          y: i === 0 ? 0 : "100vh",
          scale: 1,
          zIndex: i,
        });
      });

      const tl = gsap.timeline({ paused: true });

      for (let i = 1; i < totalCards; i++) {
        tl.to(cardEls.current[i], { y: 0, ease: "power2.out" }, i - 1);
        tl.to(cardEls.current[i - 1], { scale: 0.94, ease: "power2.out" }, i - 1);
      }

      ScrollTrigger.create({
        trigger: stackWrapRef.current,
        start: "top top",
        end: `+=${scrollPerCard * (totalCards - 1)}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.8,
        animation: tl,
      });
    }

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

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [cards]);

  return (
    <main>
      {/* Hero */}
      <section className="relative h-screen w-full overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/45" />
        <div
          ref={heroRef}
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
        >
          <img className="w-[25vw]" src="/GP.png" alt="Logo" />
          <div className="hero-item flex flex-col items-center gap-3">
            <p className="text-[clamp(2rem,2.5vw,3.5rem)] font-light uppercase text-white/80">
              Where Life Find Balance
            </p>
          </div>
        </div>
      </section>

      {/* Stacking Feature Cards */}
      <section
        ref={stackWrapRef}
        className="bg-[#f0ebe3] flex items-center justify-center min-h-screen px-6 py-16"
      >
        <div className="relative w-[70%]" style={{ height: "62vh" }}>
          {cards.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-600">No feature cards found.</p>
            </div>
          ) : (
            cards.map((card, i) => (
              <div
                key={card.id}
                ref={(el) => (cardEls.current[i] = el)}
                className="absolute inset-0 flex rounded-tl-[130px] rounded-br-[130px] overflow-hidden shadow-xl"
                style={{ zIndex: i }}
              >
                {/* Left image */}
                <div className="relative w-[52%] flex-shrink-0">
                  <img
                    src={card.showcaseCardFields?.image?.node?.sourceUrl || "/menu-bg.jpg"}
                    alt={card.title}
                    className="w-full h-full object-cover"
                    style={{ backgroundColor: "#2d4a2d" }}
                  />
                  <div className="absolute inset-0 bg-[#3a5a3a]/30" />
                  <span className="absolute bottom-4 left-4 text-white/70 text-xs tracking-widest uppercase">
                    {card.showcaseCardFields?.label}
                  </span>
                </div>

                {/* Right content */}
                <div
                  className={`flex-1 ${
                    card.showcaseCardFields?.background || "bg-[#2c4a30]"
                  } flex flex-col justify-center px-10 py-10 text-white`}
                >
                  <h2
                    className="font-serif text-[clamp(1.6rem,3vw,2.8rem)] font-light uppercase tracking-wide leading-tight mb-3"
                    dangerouslySetInnerHTML={{ __html: card.title }}
                  />
                  <p className="text-sm font-semibold mb-1">
                    <span className="font-bold">{card.showcaseCardFields?.subtitle}</span>{" "}
                    <span className="font-light opacity-80">
                      {card.showcaseCardFields?.subtitleSuffix}
                    </span>
                  </p>

                  <div className="flex items-center gap-3 my-5">
                    <span className="flex-1 h-px bg-white/20" />
                  </div>

                  <div
                    className="text-sm md:text-base text-white/70 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: card.content }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
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
