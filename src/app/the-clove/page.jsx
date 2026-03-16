// "use client";

// import { useEffect, useRef } from "react";
// import { gsap } from "gsap";

// export default function TheClove() {
//   const heroRef = useRef(null);

//   useEffect(() => {
//     if (!heroRef.current) return;
//     gsap.fromTo(
//       heroRef.current.querySelectorAll(".hero-item"),
//       { opacity: 0, y: 40 },
//       { opacity: 1, y: 0, duration: 1.1, stagger: 0.2, ease: "power3.out", delay: 0.3 }
//     );
//   }, []);

//   return (
//     <main>
//       {/* Hero */}
//       <section className="relative h-screen w-full overflow-hidden">
//         <video
//           autoPlay
//           muted
//           loop
//           playsInline
//           className="absolute inset-0 w-full h-full object-cover"
//         >
//           <source src="/hero.mp4" type="video/mp4" />
//         </video>
//         <div className="absolute inset-0 bg-black/50" />

//         <div
//           ref={heroRef}
//           className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 gap-8"
//         >
//           {/* Logo */}
//           <div className="hero-item">
//             <h1 className="uppercase text-white text-[100px]">The Clove</h1>
//           </div>

//           {/* Register Button */}
//           <div className="hero-item">
//             <a
//               href="#register"
//               className="inline-block px-10 py-3 rounded-full border border-[#42B58B] bg-[#42B58B] text-white text-[14px] uppercase font-light bg-white/10 hover:bg-white hover:text-black transition-all duration-300"
//             >
//               Register
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* Intro / USP Section */}
//       <section className="bg-white px-6 py-20 flex flex-col items-center text-center">
//         {/* Project Logo */}
//         <img
//           src="/clove-logo.png"
//           alt="The Clove Logo"
//           className="w-[160px] mb-12"
//         />

//         {/* Heading */}
//         <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-light text-[#1a3a2a] leading-tight mb-6 max-w-3xl">
//           Discover a new way of{" "}
//           <span className="text-[#42B58B] italic">living.</span>
//         </h2>

//         {/* Subheading */}
//         <p className="text-gray-500 text-[clamp(0.9rem,1.2vw,1.05rem)] leading-relaxed max-w-xl mb-16">
//           This innovative solution is tailored to suit modern lifestyles which have evolved
//           over the years. Compared to a traditional terrace row, The Clove&apos;s
//           revolutionary design features only 8 units per cluster.
//         </p>

//         {/* USP Icons */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 max-w-3xl w-full">
//           <div className="flex flex-col items-center gap-5">
//             <div className=" rounded-full flex items-center justify-center">
//               <img src="/usp.png" className="w-[110px] h-[110px] object-contain" />
//             </div>
//             <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line">
//               Lorem ipsum la boss
//             </p>
//           </div>
//           <div className="flex flex-col items-center gap-5">
//             <div className=" rounded-full flex items-center justify-center">
//               <img src="/usp.png" className="w-[110px] h-[110px] object-contain" />
//             </div>
//             <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line">
//               Lorem ipsum la boss
//             </p>
//           </div>
//           <div className="flex flex-col items-center gap-5">
//             <div className=" rounded-full flex items-center justify-center">
//               <img src="/usp.png" className="w-[110px] h-[110px] object-contain" />
//             </div>
//             <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line">
//               Lorem ipsum la boss
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Property Cards Section */}
//       <section className="bg-[#f0ebe3] px-8 py-20">
//         <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             <div className="bg-white rounded-t-2xl overflow-hidden shadow-lg flex flex-col">
//               {/* Image */}
//               <div className="relative">
//                 <img src="/menu-bg.jpg" className="w-full h-[220px] object-cover" />
//               </div>

//               {/* Body */}
//               <div className="px-4 py-6 flex flex-col flex-1 gap-3">
//                 <div>
//                   <h3 className="font-serif text-[1.5rem] text-[#1a3a2a] mb-1">Lorem Ipsum</h3>
//                   <p className="text-gray-500 text-sm">Laparrrrrr</p>
//                 </div>

//                 <hr className="border-gray-200" />

//                 <p className="text-gray-500 text-sm leading-relaxed flex-1">Nak rayaaaaa dah ni weiii</p>

//                 {/* Pricing */}
//                 <div className="grid grid-cols-2 gap-3 mt-2">
//                   <div className="bg-[#e8f5ef] rounded-lg px-4 py-3">
//                     <p className="text-gray-400 text-[11px] mb-0.5">From</p>
//                     <p className="text-[#1a3a2a] font-bold text-[20px]">RM3000</p>
//                   </div>
//                   <div className="bg-[#e8f5ef] rounded-lg px-4 py-3">
//                     <p className="text-gray-400 text-[11px] mb-0.5">From</p>
//                     <p className="text-[#1a3a2a] font-bold text-[20px]">
//                       RM300 <span className="font-light text-xs">/month</span>
//                     </p>
//                   </div>
//                 </div>

//                 {/* Buttons */}
//                 <div className="grid grid-cols-2 gap-3 mt-2">
//                   <button className="rounded-full border border-gray-300 text-gray-700 text-xs uppercase tracking-widest py-2.5 hover:border-[#42B58B] hover:text-[#42B58B] transition">
//                     Features
//                   </button>
//                   <button className="rounded-full bg-[#42B58B] text-white text-xs uppercase tracking-widest py-2.5 hover:bg-[#3d9a78] transition">
//                     Learn More
//                   </button>
//                 </div>
//               </div>
//             </div>
//                         <div className="bg-white rounded-t-2xl overflow-hidden shadow-lg flex flex-col">
//               {/* Image */}
//               <div className="relative">
//                 <img src="/menu-bg.jpg" className="w-full h-[220px] object-cover" />
//               </div>

//               {/* Body */}
//               <div className="px-4 py-6 flex flex-col flex-1 gap-3">
//                 <div>
//                   <h3 className="font-serif text-[1.5rem] text-[#1a3a2a] mb-1">Lorem Ipsum</h3>
//                   <p className="text-gray-500 text-sm">Laparrrrrr</p>
//                 </div>

//                 <hr className="border-gray-200" />

//                 <p className="text-gray-500 text-sm leading-relaxed flex-1">Nak rayaaaaa dah ni weiii</p>

//                 {/* Pricing */}
//                 <div className="grid grid-cols-2 gap-3 mt-2">
//                   <div className="bg-[#e8f5ef] rounded-lg px-4 py-3">
//                     <p className="text-gray-400 text-[11px] mb-0.5">From</p>
//                     <p className="text-[#1a3a2a] font-bold text-[20px]">RM3000</p>
//                   </div>
//                   <div className="bg-[#e8f5ef] rounded-lg px-4 py-3">
//                     <p className="text-gray-400 text-[11px] mb-0.5">From</p>
//                     <p className="text-[#1a3a2a] font-bold text-[20px]">
//                       RM300 <span className="font-light text-xs">/month</span>
//                     </p>
//                   </div>
//                 </div>

//                 {/* Buttons */}
//                 <div className="grid grid-cols-2 gap-3 mt-2">
//                   <button className="rounded-full border border-gray-300 text-gray-700 text-xs uppercase tracking-widest py-2.5 hover:border-[#42B58B] hover:text-[#42B58B] transition">
//                     Features
//                   </button>
//                   <button className="rounded-full bg-[#42B58B] text-white text-xs uppercase tracking-widest py-2.5 hover:bg-[#3d9a78] transition">
//                     Learn More
//                   </button>
//                 </div>
//               </div>
//             </div>
//                         <div className="bg-white rounded-t-2xl overflow-hidden shadow-lg flex flex-col">
//               {/* Image */}
//               <div className="relative">
//                 <img src="/menu-bg.jpg" className="w-full h-[220px] object-cover" />
//               </div>

//               {/* Body */}
//               <div className="px-4 py-6 flex flex-col flex-1 gap-3">
//                 <div>
//                   <h3 className="font-serif text-[1.5rem] text-[#1a3a2a] mb-1">Lorem Ipsum</h3>
//                   <p className="text-gray-500 text-sm">Laparrrrrr</p>
//                 </div>

//                 <hr className="border-gray-200" />

//                 <p className="text-gray-500 text-sm leading-relaxed flex-1">Nak rayaaaaa dah ni weiii</p>

//                 {/* Pricing */}
//                 <div className="grid grid-cols-2 gap-3 mt-2">
//                   <div className="bg-[#e8f5ef] rounded-lg px-4 py-3">
//                     <p className="text-gray-400 text-[11px] mb-0.5">From</p>
//                     <p className="text-[#1a3a2a] font-bold text-[20px]">RM3000</p>
//                   </div>
//                   <div className="bg-[#e8f5ef] rounded-lg px-4 py-3">
//                     <p className="text-gray-400 text-[11px] mb-0.5">From</p>
//                     <p className="text-[#1a3a2a] font-bold text-[20px]">
//                       RM300 <span className="font-light text-xs">/month</span>
//                     </p>
//                   </div>
//                 </div>

//                 {/* Buttons */}
//                 <div className="grid grid-cols-2 gap-3 mt-2">
//                   <button className="rounded-full border border-gray-300 text-gray-700 text-xs uppercase tracking-widest py-2.5 hover:border-[#42B58B] hover:text-[#42B58B] transition">
//                     Features
//                   </button>
//                   <button className="rounded-full bg-[#42B58B] text-white text-xs uppercase tracking-widest py-2.5 hover:bg-[#3d9a78] transition">
//                     Learn More
//                   </button>
//                 </div>
//               </div>
//             </div>
//         </div>
//       </section>

//       {/* Register Form */}
//       <section
//         id="register"
//         className="min-h-screen flex items-center justify-center bg-[#f0ebe3] px-6 py-24"
//       >
//         <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10">
//           <h2 className="text-3xl font-bold text-gray-800 mb-2">Register Interest</h2>
//           <p className="text-gray-500 mb-8">Be the first to know about The Clove.</p>

//           <form className="space-y-5">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//               <input
//                 type="text"
//                 placeholder="John Doe"
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4caf8a]"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
//               <input
//                 type="email"
//                 placeholder="john@example.com"
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4caf8a]"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
//               <input
//                 type="tel"
//                 placeholder="+60 12 345 6789"
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4caf8a]"
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-[#4caf8a] text-white font-semibold py-2.5 rounded-lg hover:bg-[#3d9a78] transition"
//             >
//               Register
//             </button>
//           </form>
//         </div>
//       </section>
//     </main>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import client from "../../lib/apolloClient";
import { gql } from "@apollo/client";

const GET_CLOVE_DATA = gql`
  query GetCloveData {
    page(id: "the-clove", idType: URI) {
      id
      title
      clovePageFields {
        hero_title
        herovideo {
          node {
            mediaItemUrl
            mimeType
          }
        }
        sectionLogo {
          node {
            sourceUrl
          }
        }
        sectionHeading
        sectionDescription
      }
    }

    theCloves(first: 20, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        id
        title
        slug
        content
        propertyFields {
          subtitle
          description
          price
          monthlyprice
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

export default function TheClove() {
  const heroRef = useRef(null);

  const [cards, setCards] = useState([]);
  const [heroTitle, setHeroTitle] = useState(null);
  const [heroVideo, setHeroVideo] = useState(null);
  const [heroVideoType, setHeroVideoType] = useState(null);
  const [sectionLogo, setSectionLogo] = useState(null);
  const [sectionHeading, setSectionHeading] = useState(null);
  const [sectionDescription, setSectionDescription] = useState(null);

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    client
      .query({
        query: GET_CLOVE_DATA,
        fetchPolicy: "no-cache",
      })
      .then((result) => {
        const fetchedCards = result?.data?.theCloves?.nodes || [];
        const pageData = result?.data?.page || null;
        const pageFields = pageData?.clovePageFields || null;

        setCards(fetchedCards);
        setHeroTitle(pageFields?.hero_title || pageData?.title || "");
        setHeroVideo(pageFields?.herovideo?.node?.mediaItemUrl || "");
        setHeroVideoType(pageFields?.herovideo?.node?.mimeType || "video/mp4");
        setSectionLogo(pageFields?.sectionLogo?.node?.sourceUrl || "");
        setSectionHeading(pageFields?.sectionHeading || "");
        setSectionDescription(pageFields?.sectionDescription || "");
        setErrorMsg("");
      })
      .catch((error) => {
        console.error("GraphQL fetch error:", error);
        setErrorMsg(error.message || "Failed to fetch GraphQL data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!heroRef.current || loading) return;

    gsap.fromTo(
      heroRef.current.querySelectorAll(".hero-item"),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.3,
      }
    );
  }, [loading]);

  const renderStyledHeading = (text) => {
    if (!text) return null;

    const trimmed = text.trim();
    if (!trimmed) return null;

    const hasDot = trimmed.endsWith(".");
    const textWithoutDot = hasDot ? trimmed.slice(0, -1) : trimmed;

    const words = textWithoutDot.split(" ").filter(Boolean);
    if (words.length === 0) return null;

    const lastWord = words.pop();
    const firstPart = words.join(" ");

    return (
      <>
        {firstPart && `${firstPart} `}
        <span className="text-[#42B58B] italic">{lastWord}</span>
        {hasDot && <span className="text-[#c9a15d]">.</span>}
      </>
    );
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-500 text-sm uppercase tracking-[0.2em]">
          Loading...
        </p>
      </main>
    );
  }

  if (errorMsg) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white px-6">
        <p className="text-red-500 text-sm text-center">{errorMsg}</p>
      </main>
    );
  }

  return (
    <main>
      <section className="relative h-screen w-full overflow-hidden">
        {heroVideo ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={heroVideo} type={heroVideoType || "video/mp4"} />
          </video>
        ) : (
          <div className="absolute inset-0 bg-black" />
        )}

        <div className="absolute inset-0 bg-black/50" />

        <div
          ref={heroRef}
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 gap-8"
        >
          <div className="hero-item">
            <h1 className="uppercase text-white text-[100px]">
              {heroTitle || ""}
            </h1>
          </div>

          <div className="hero-item">
            <a
              href="#register"
              className="inline-block px-10 py-3 rounded-full border border-[#42B58B] bg-[#42B58B] text-white text-[14px] uppercase font-light bg-white/10 hover:bg-white hover:text-black transition-all duration-300"
            >
              Register
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 flex flex-col items-center text-center">
        {sectionLogo && (
          <img
            src={sectionLogo}
            alt="The Clove Logo"
            className="w-[160px] mb-12"
          />
        )}

        {sectionHeading && (
          <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-light text-[#1a3a2a] leading-tight mb-6 max-w-3xl">
            {renderStyledHeading(sectionHeading)}
          </h2>
        )}

        {sectionDescription && (
          <p className="text-gray-500 text-[clamp(0.9rem,1.2vw,1.05rem)] leading-relaxed max-w-xl mb-16">
            {sectionDescription}
          </p>
        )}
      </section>

      <section className="bg-[#f0ebe3] px-8 py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.length === 0 ? (
            <div className="col-span-full text-center text-gray-600">
              No property cards found.
            </div>
          ) : (
            cards.map((card) => {
              const imageUrl = card.propertyFields?.image?.node?.sourceUrl || "";
              const subtitle = card.propertyFields?.subtitle || "";
              const description =
                card.propertyFields?.description ||
                card.content?.replace(/<[^>]+>/g, "") ||
                "";
              const price = card.propertyFields?.price || "";
              const monthlyprice = card.propertyFields?.monthlyprice || "";

              return (
                <div
                  key={card.id}
                  className="bg-white rounded-t-2xl overflow-hidden shadow-lg flex flex-col"
                >
                  {imageUrl ? (
                    <div className="relative">
                      <img
                        src={imageUrl}
                        alt={card.title || ""}
                        className="w-full h-[220px] object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-[220px] bg-transparent" />
                  )}

                  <div className="px-4 py-6 flex flex-col flex-1 gap-3">
                    <div>
                      <h3 className="font-serif text-[1.5rem] text-[#1a3a2a] mb-1">
                        {card.title || ""}
                      </h3>
                      {subtitle && (
                        <p className="text-gray-500 text-sm">{subtitle}</p>
                      )}
                    </div>

                    <hr className="border-gray-200" />

                    {description && (
                      <p className="text-gray-500 text-sm leading-relaxed flex-1">
                        {description}
                      </p>
                    )}

                    <div className="grid grid-cols-2 gap-3 mt-2">
                      <div className="bg-[#e8f5ef] rounded-lg px-4 py-3">
                        <p className="text-gray-400 text-[11px] mb-0.5">From</p>
                        <p className="text-[#1a3a2a] font-bold text-[20px]">
                          {price}
                        </p>
                      </div>

                      <div className="bg-[#e8f5ef] rounded-lg px-4 py-3">
                        <p className="text-gray-400 text-[11px] mb-0.5">From</p>
                        <p className="text-[#1a3a2a] font-bold text-[20px]">
                          {monthlyprice}
                          {monthlyprice && (
                            <span className="font-light text-xs"> /month</span>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-2">
                      <button className="rounded-full border border-gray-300 text-gray-700 text-xs uppercase tracking-widest py-2.5 hover:border-[#42B58B] hover:text-[#42B58B] transition">
                        Features
                      </button>
                      <a
                        href={card.slug ? `/property/${card.slug}` : "#"}
                        className="rounded-full bg-[#42B58B] text-white text-xs uppercase tracking-widest py-2.5 hover:bg-[#3d9a78] transition text-center"
                      >
                        Learn More
                      </a>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      <section
        id="register"
        className="min-h-screen flex items-center justify-center bg-[#f0ebe3] px-6 py-24"
      >
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Register Interest
          </h2>
          <p className="text-gray-500 mb-8">
            Be the first to know about The Clove.
          </p>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4caf8a]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4caf8a]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+60 12 345 6789"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4caf8a]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#4caf8a] text-white font-semibold py-2.5 rounded-lg hover:bg-[#3d9a78] transition"
            >
              Register
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}