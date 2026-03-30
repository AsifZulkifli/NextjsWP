"use client";

import { useState, useEffect } from "react";
import { gql } from "@apollo/client";
import client from "../../lib/apolloClient";
import dynamic from "next/dynamic";

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
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    client
      .query({
        query: GET_TOWNSHIP_DATA,
        fetchPolicy: "no-cache",
      })
      .then((result) => {
        const rawMapConfig = result?.data?.mapSettings?.nodes?.[0]?.mapSettingFields || null;
        const rawAmenities = result?.data?.amenities?.nodes || [];
        const rawHighways = result?.data?.highways?.nodes || [];
        const rawAwards = result?.data?.awards?.nodes || [];

        const normalizedAmenities = rawAmenities
          .map((item) => {
            const fields = item?.amenityFields || {};
            const categoryValue = Array.isArray(fields.category) ? fields.category[0] : (fields.category || "Other");
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
          .filter((item) => !Number.isNaN(item.coordinates.lat) && !Number.isNaN(item.coordinates.lng));

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

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-500 text-sm uppercase tracking-[0.2em]">Loading...</p>
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
              <div className="col-span-full text-center text-gray-500">No amenities available.</div>
            ) : (
              amenities.map((amenity) => (
                <button
                  key={amenity.id}
                  type="button"
                  onClick={() => setSelectedAmenity(amenity)}
                  className="rounded-2xl bg-white p-4 text-left shadow-sm transition hover:shadow-md"
                >
                  <p className="text-xs uppercase tracking-wide text-[#42B58B]">{amenity.category}</p>
                  <h4 className="mt-1 text-sm font-semibold text-[#1a3a2a]">{amenity.name}</h4>
                  {amenity.distance && <p className="mt-2 text-xs text-gray-500">{amenity.distance}</p>}
                </button>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif text-[#1a3a2a] text-center mb-12">Awards</h2>
          {awards.length === 0 ? (
            <div className="text-center py-12 text-gray-500">No awards available.</div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {awards.map((award) => {
                const fields = award?.awardFields || {};
                return (
                  <a
                    key={award.id}
                    href={fields.awardlink || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block overflow-hidden rounded-2xl bg-gray-50 shadow-md transition-shadow duration-300 hover:shadow-xl"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={fields.awardthumbnail?.node?.sourceUrl || "/placeholder.jpg"}
                        alt={fields.awardname || award.title || "Award"}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex items-center gap-4 p-5">
                      <img
                        src={fields.awardlogo?.node?.sourceUrl || "/placeholder-logo.png"}
                        alt={fields.awardname || "Award Logo"}
                        className="h-12 w-12 object-contain"
                      />
                      <div>
                        <h3 className="font-serif text-lg font-semibold text-gray-800 transition group-hover:text-[#42B58B]">
                          {fields.awardname || award.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">Learn more →</p>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}