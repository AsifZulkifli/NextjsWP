"use client";

import { useEffect, useMemo, useState } from "react";
import client from "../../lib/apolloClient";
import { gql } from "@apollo/client";

const GET_HOME_DATA = gql`
  query GetHomeData {
    homes(first: 20, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        id
        title
        slug
        homeCategories {
          nodes {
            id
            name
            slug
          }
        }
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
          featureslink
          learnmorelink
        }
      }
    }
  }
`;

export default function Homes() {
  const [cards, setCards] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    client
      .query({
        query: GET_HOME_DATA,
        fetchPolicy: "no-cache",
      })
      .then((result) => {
        const fetchedCards = result?.data?.homes?.nodes || [];
        setCards(fetchedCards);
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

  const tabs = useMemo(() => {
    const termMap = new Map();

    cards.forEach((card) => {
      card.homeCategories?.nodes?.forEach((term) => {
        if (!termMap.has(term.slug)) {
          termMap.set(term.slug, {
            id: term.id,
            name: term.name,
            slug: term.slug,
          });
        }
      });
    });

    return [
      { id: "all", name: "ALL", slug: "all" },
      ...Array.from(termMap.values()),
    ];
  }, [cards]);

  const filteredCards = useMemo(() => {
    if (activeTab === "all") return cards;

    return cards.filter((card) =>
      card.homeCategories?.nodes?.some((term) => term.slug === activeTab)
    );
  }, [cards, activeTab]);

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
      <section className="bg-[#f0ebe3] px-4 md:px-8 pt-28 md:pt-36 pb-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="bg-white rounded-[999px] p-3 shadow-sm overflow-x-auto">
              <div className="flex items-center gap-3 min-w-max">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.slug;

                  return (
                    <button
                      key={tab.slug}
                      type="button"
                      onClick={() => setActiveTab(tab.slug)}
                      className={`shrink-0 cursor-pointer rounded-full border px-5 py-2.5 text-sm uppercase whitespace-nowrap transition-all duration-200 ${
                        isActive
                          ? "bg-[#42B58B] border-[#42B58B] text-white font-semibold shadow-sm"
                          : "bg-white border-transparent text-[#43515c] hover:border-[#42B58B] hover:text-[#42B58B]"
                      }`}
                    >
                      {tab.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCards.length === 0 ? (
              <div className="col-span-full text-center text-gray-600">
                No home cards found.
              </div>
            ) : (
              filteredCards.map((card) => {
                const imageUrl = card.propertyFields?.image?.node?.sourceUrl || "";
                const subtitle = card.propertyFields?.subtitle || "";
                const description = card.propertyFields?.description || "";
                const price = card.propertyFields?.price || "";
                const monthlyprice = card.propertyFields?.monthlyprice || "";
                const featuresLink = card.propertyFields?.featureslink || "";
                const learnMoreLink = card.propertyFields?.learnmorelink || "";

                const learnMoreUrl = learnMoreLink
                  ? learnMoreLink
                  : card.slug
                  ? `/property/${card.slug}`
                  : "#";

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
                        <p className="text-gray-500 text-sm leading-relaxed flex-1 whitespace-pre-line">
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
                        {featuresLink ? (
                          <a
                            href={featuresLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full border border-gray-300 text-gray-700 text-xs uppercase tracking-widest py-2.5 hover:border-[#42B58B] hover:text-[#42B58B] transition text-center"
                          >
                            Features
                          </a>
                        ) : (
                          <button
                            type="button"
                            className="rounded-full border border-gray-300 text-gray-700 text-xs uppercase tracking-widest py-2.5 hover:border-[#42B58B] hover:text-[#42B58B] transition"
                          >
                            Features
                          </button>
                        )}

                        <a
                          href={learnMoreUrl}
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
        </div>
      </section>
    </main>
  );
}