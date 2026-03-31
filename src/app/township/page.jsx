"use client";

import { useState, useEffect } from "react";
import { gql } from "@apollo/client";
import client from "../../lib/apolloClient";
import dynamic from "next/dynamic";
import Image from "next/image";

// Dynamically import the map component (no SSR)
const TownshipMap = dynamic(() => import("./TownshipMap"), { ssr: false });

const GET_TOWNSHIP_DATA = gql`
  query GetTownshipMap {
    mapSettings(first: 1) {
      nodes {
        id
        title
        mapSettingFields {
          mapCenterLat
          mapCenterLong
          mapZoom
          mapPinLabel
          mapPinLat
          mapPinLng
        }
      }
    }
    amenities(first: 100, where: { status: PUBLISH }) {
      nodes {
        id
        title
        amenityFields {
          category
          distance
          lat
          lng
          icon {
            node {
              sourceUrl
            }
          }
        }
      }
    }
    highways(first: 20, where: { status: PUBLISH }) {
      nodes {
        id
        title
        highwayFields {
          linecolor
          sortorder
        }
      }
    }
    awards(first: 50, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        id
        title
        slug
        awardFields {
          awardname
          awardthumbnail {
            node {
              sourceUrl
            }
          }
          awardlogo {
            node {
              sourceUrl
            }
          }
          awardlink
          awardYear
        }
      }
    }
  }
`;

export default function TownshipPage() {
  const [selectedAmenity, setSelectedAmenity] = useState(null);
  const [mapConfig, setMapConfig] = useState(null);
  const [amenities, setAmenities] = useState([]);
  const [highways, setHighways] = useState([]);
  const [awards, setAwards] = useState([]);
  const [visibleAwardsCount, setVisibleAwardsCount] = useState(3);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    client
      .query({
        query: GET_TOWNSHIP_DATA,
        fetchPolicy: "no-cache",
      })
      .then((result) => {
        const rawMapConfig =
          result?.data?.mapSettings?.nodes?.[0]?.mapSettingFields || null;
        const rawAmenities = result?.data?.amenities?.nodes || [];
        const rawHighways = result?.data?.highways?.nodes || [];
        const rawAwards = result?.data?.awards?.nodes || [];

        const normalizedAmenities = rawAmenities
          .map((item) => {
            const fields = item?.amenityFields || {};
            const categoryValue = Array.isArray(fields.category)
              ? fields.category[0]
              : fields.category || "Other";

            return {
              id: item.id,
              name: item.title,
              category: categoryValue,
              distance: fields.distance || "",
              coordinates: {
                lat: Number(fields.lat),
                lng: Number(fields.lng),
              },
              icon: fields?.icon?.node?.sourceUrl || "",
            };
          })
          .filter(
            (item) =>
              !Number.isNaN(item.coordinates.lat) &&
              !Number.isNaN(item.coordinates.lng)
          );

        const normalizedHighways = rawHighways
          .map((item) => ({
            id: item.id,
            name: item.title,
            linecolor: item?.highwayFields?.linecolor || "#42B58B",
            sortorder: Number(item?.highwayFields?.sortorder || 0),
          }))
          .sort((a, b) => a.sortorder - b.sortorder);

        setMapConfig(rawMapConfig);
        setAmenities(normalizedAmenities);
        setHighways(normalizedHighways);
        setAwards(rawAwards);
        setErrorMsg("");
      })
      .catch((error) => {
        console.error("GraphQL fetch error:", error);
        setErrorMsg(error.message || "Failed to fetch township data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const visibleAwards = awards.slice(0, visibleAwardsCount);
  const hasMoreAwards = visibleAwardsCount < awards.length;

  const handleLoadMoreAwards = () => {
    setVisibleAwardsCount((prev) => prev + 3);
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
      <section className="bg-[#f7f4ee] px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif text-[#1a3a2a] text-center mb-12">
            Explore Our <span className="text-[#42B58B]">Amenities</span>
          </h2>

          <TownshipMap
            mapConfig={mapConfig}
            amenities={amenities}
            highways={highways}
            selectedAmenity={selectedAmenity}
            setSelectedAmenity={setSelectedAmenity}
          />

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {amenities.length === 0 ? (
              <div className="col-span-full text-center text-gray-500">
                No amenities available.
              </div>
            ) : (
              amenities.map((amenity) => (
                <button
                  key={amenity.id}
                  type="button"
                  onClick={() => setSelectedAmenity(amenity)}
                  className="rounded-2xl bg-white p-4 text-left shadow-sm transition hover:shadow-md"
                >
                  <p className="text-xs uppercase tracking-wide text-[#42B58B]">
                    {amenity.category}
                  </p>
                  <h4 className="mt-1 text-sm font-semibold text-[#1a3a2a]">
                    {amenity.name}
                  </h4>
                  {amenity.distance && (
                    <p className="mt-2 text-xs text-gray-500">
                      {amenity.distance}
                    </p>
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f0e8] px-6 py-20 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <h2 className="text-[42px] leading-none font-serif text-[#5b6b5c] md:text-[58px]">
              Awards
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[16px] text-[#2f2f2f]">
              Excellence is not just a catchphrase at Gamuda Land, but truly a
              way of life.
            </p>
          </div>

          {awards.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              No awards available.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {visibleAwards.map((award) => {
                  const fields = award?.awardFields || {};
                  const awardTitle = fields.awardname || award.title || "Award";
                  const awardImage =
                    fields.awardthumbnail?.node?.sourceUrl ||
                    "/placeholder.jpg";
                  const awardLogo =
                    fields.awardlogo?.node?.sourceUrl ||
                    "/placeholder-logo.png";
                  const awardYear = fields.awardYear || "";

                  return (
                    <a
                      key={award.id}
                      href={fields.awardlink || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block overflow-hidden rounded-tr-[56px] rounded-bl-[56px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)]"
                    >
                      <div className="relative h-[240px] w-full overflow-hidden rounded-tr-[56px]">
                        <Image
                          src={awardImage}
                          alt={awardTitle}
                          fill
                          unoptimized
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="relative px-5 pb-7 pt-4">
                        {awardYear && (
                          <div className="mb-4 inline-block rounded-md border border-[#8cc08c] bg-[#eef8ee] px-4 py-1 text-sm font-medium text-[#5da16c]">
                            {awardYear}
                          </div>
                        )}

                        <div className="absolute right-5 top-[-28px] flex h-[62px] w-[62px] items-center justify-center rounded-full border-4 border-white bg-white shadow-md">
                          <Image
                            src={awardLogo}
                            alt={`${awardTitle} logo`}
                            width={42}
                            height={42}
                            unoptimized
                            className="object-contain"
                          />
                        </div>

                        <h3 className="max-w-[85%] font-serif text-[20px] font-semibold leading-[1.35] text-[#5f6a60]">
                          {awardTitle}
                        </h3>
                      </div>
                    </a>
                  );
                })}
              </div>

              {hasMoreAwards && (
                <div className="mt-12 flex justify-center">
                  <button
                    type="button"
                    onClick={handleLoadMoreAwards}
                    className="group text-sm font-semibold uppercase tracking-[0.08em] text-[#707a6d]"
                  >
                    <span>Load More</span>
                    <span className="mx-auto mt-2 block h-[1px] w-[120px] bg-[#8fb08a] transition-all duration-300 group-hover:w-[150px]" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}