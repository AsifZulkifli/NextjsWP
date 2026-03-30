"use client";

import { useEffect, useState } from "react";
import client from "../../lib/apolloClient";
import { gql } from "@apollo/client";

const GET_CLOVE_DATA = gql`
  query GetCloveData {
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
  const [cards, setCards] = useState([]);
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
    </main>
  );
}