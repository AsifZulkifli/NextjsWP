"use client";

import { useState, useEffect, useMemo } from "react";
import { gql } from "@apollo/client";
import client from "../../lib/apolloClient";
import dynamic from "next/dynamic";
import Image from "next/image";
import { SlidersHorizontal, ChevronDown, Trophy } from "lucide-react";

// Dynamically import the map component (no SSR)
const TownshipMap = dynamic(() => import("./TownshipMap"), { ssr: false });

const GET_TOWNSHIP_DATA = gql`
  query GetTownshipMap {
    mapSettings(first: 1) {
      nodes {
        id
        title
        mapSettingFields {
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
          awardSubscription
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
  const [selectedYear, setSelectedYear] = useState("all");
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

  const yearOptions = useMemo(() => {
    const years = awards
      .map((award) => award?.awardFields?.awardYear)
      .filter(Boolean);

    return [...new Set(years)].sort((a, b) => Number(b) - Number(a));
  }, [awards]);

  const filteredAwards = useMemo(() => {
    const filtered =
      selectedYear === "all"
        ? awards
        : awards.filter(
            (award) =>
              String(award?.awardFields?.awardYear) === String(selectedYear)
          );

    return filtered;
  }, [awards, selectedYear]);

  const visibleAwards = filteredAwards.slice(0, visibleAwardsCount);
  const hasMoreAwards = visibleAwardsCount < filteredAwards.length;

  const handleLoadMoreAwards = () => {
    setVisibleAwardsCount((prev) => prev + 3);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    setVisibleAwardsCount(3);
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

      <section className="bg-[#f3f1ef] px-6 py-20 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-[52px] leading-none text-[#1f5a36] md:text-[72px]">
              Awards
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-[18px] leading-relaxed text-[#222222]">
              Excellence is not just a catchphrase at Gamuda Land, but truly a
              way of life.
            </p>
          </div>

          <div className="mb-10 flex justify-end">
            <div className="relative w-full max-w-[240px]">
              <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#4a4a4a]">
                <SlidersHorizontal size={18} />
              </div>

              <select
                value={selectedYear}
                onChange={handleYearChange}
                className="h-[52px] w-full appearance-none rounded-[12px] border border-[#e5e5e5] bg-white pl-12 pr-12 text-[18px] text-[#1f5a36] shadow-[0_4px_12px_rgba(0,0,0,0.08)] outline-none"
              >
                <option value="all">Year</option>
                {yearOptions.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>

              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#8b8b8b]">
                <ChevronDown size={18} />
              </div>
            </div>
          </div>

          {filteredAwards.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              No awards available.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                {visibleAwards.map((award) => {
                  const fields = award?.awardFields || {};
                  const awardName = fields.awardname || award.title || "Award";
                  const awardThumbnail =
                    fields.awardthumbnail?.node?.sourceUrl ||
                    "/placeholder.jpg";
                  const awardSubscription = fields.awardSubscription;
                  const awardLink = fields.awardlink || "#";
                  const awardYear = fields.awardYear || "";

                  const isSubscriptionUrl =
                    awardSubscription &&
                    (awardSubscription.startsWith("http") ||
                      awardSubscription.startsWith("/"));

                  return (
                    <a
                      key={award.id}
                      href={awardLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block overflow-hidden rounded-[24px] bg-[#f9f8f5] shadow-[0_6px_16px_rgba(0,0,0,0.14)] transition duration-300 hover:-translate-y-1"
                    >
                      <div className="relative">
                        <div className="relative h-[245px] w-full overflow-hidden">
                          <Image
                            src={awardThumbnail}
                            alt={awardName}
                            fill
                            unoptimized
                            className="object-cover transition duration-500 group-hover:scale-105"
                          />
                        </div>

                        {awardYear && (
                          <div className="absolute bottom-[-18px] left-1/2 -translate-x-1/2">
                            <span className="inline-flex min-w-[88px] items-center justify-center rounded-[9px] border border-[#67c79d] bg-[#f5f5f0] px-5 py-2 text-[18px] font-medium text-[#39b77d] shadow-sm">
                              {awardYear}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex min-h-[142px] items-center justify-center px-8 pb-8 pt-12 text-center">
                        <h3 className="font-serif text-[22px] leading-[1.15] text-[#1f5a36] md:text-[24px]">
                          {awardName}
                        </h3>
                      </div>

                      <div className="relative border-t border-[#d8d8d8]">
                        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                          <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#49bf8d] shadow-sm">
                            <Trophy size={16} className="text-white" />
                          </div>
                        </div>

                        <div className="px-8 pb-10 pt-10 text-center">
                          {awardSubscription ? (
                            isSubscriptionUrl ? (
                              <div className="relative mx-auto h-16 w-32">
                                <Image
                                  src={awardSubscription}
                                  alt={`${awardName} subscription`}
                                  fill
                                  unoptimized
                                  className="object-contain"
                                />
                              </div>
                            ) : (
                              <p className="text-[18px] leading-[1.35] text-[#255638]">
                                {awardSubscription}
                              </p>
                            )
                          ) : (
                            // Empty content – preserve spacing
                            <div className="h-4" />
                          )}
                        </div>
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