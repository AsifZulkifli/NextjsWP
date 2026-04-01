"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import {
  Leaf,
  GraduationCap,
  Cross,
  CalendarDays,
  ShoppingCart,
  Dumbbell,
  MapPin as MapPinIcon,
} from "lucide-react";

const MapContainer = dynamic(
  async () => {
    const mod = await import("react-leaflet");
    return mod.MapContainer;
  },
  { ssr: false }
);

const TileLayer = dynamic(
  async () => {
    const mod = await import("react-leaflet");
    return mod.TileLayer;
  },
  { ssr: false }
);

const Marker = dynamic(
  async () => {
    const mod = await import("react-leaflet");
    return mod.Marker;
  },
  { ssr: false }
);

const Popup = dynamic(
  async () => {
    const mod = await import("react-leaflet");
    return mod.Popup;
  },
  { ssr: false }
);

const useMapDynamic = () => import("react-leaflet");

import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const amenityCategoryIcons = {
  PARKS: Leaf,
  EDUCATION: GraduationCap,
  CLINICS: Cross,
  "EVENT SPACE": CalendarDays,
  "DAILY ESSENTIALS": ShoppingCart,
  WELLNESS: Dumbbell,
};

const categoryColorMap = {
  PARKS: "green",
  EDUCATION: "red",
  CLINICS: "gray",
  "EVENT SPACE": "pink",
  "DAILY ESSENTIALS": "green",
  WELLNESS: "red",
};

function getPinColor(type) {
  switch (type) {
    case "green":
      return "#47B58A";
    case "red":
      return "#EB5A4D";
    case "gray":
      return "#CFCBC8";
    case "pink":
      return "#E95AC6";
    default:
      return "#47B58A";
  }
}

function createAmenityIcon(type = "green") {
  const bg = getPinColor(type);

  return L.divIcon({
    className: "custom-map-pin",
    html: `
      <div style="
        width: 42px;
        height: 42px;
        border-radius: 9999px;
        background: ${bg};
        display:flex;
        align-items:center;
        justify-content:center;
        box-shadow: 0 6px 16px rgba(0,0,0,0.18);
        border: 2px solid rgba(255,255,255,0.9);
      ">
        <div style="
          width: 14px;
          height: 14px;
          border-radius: 9999px;
          background: rgba(255,255,255,0.92);
        "></div>
      </div>
    `,
    iconSize: [42, 42],
    iconAnchor: [21, 21],
    popupAnchor: [0, -18],
  });
}

function createTownshipBadge(label = "GAMUDA GARDENS") {
  return L.divIcon({
    className: "township-badge-icon",
    html: `
      <div style="
        width: 120px;
        height: 120px;
        border-radius: 9999px;
        background: #41B88C;
        color: white;
        display:flex;
        align-items:center;
        justify-content:center;
        text-align:center;
        box-shadow: 0 10px 24px rgba(0,0,0,0.22);
        padding: 12px;
        font-family: serif;
        line-height: 1.1;
      ">
        <div>
          <div style="font-size:11px; letter-spacing:0.18em; font-weight:500;">
            GAMUDA
          </div>
          <div style="font-size:26px; font-weight:300;">
            ${label.replace(/^GAMUDA\s*/i, "")}
          </div>
        </div>
      </div>
    `,
    iconSize: [120, 120],
    iconAnchor: [60, 60],
  });
}

function FitBounds({ points }) {
  const [MapHooks, setMapHooks] = useState(null);

  useMemo(() => {
    useMapDynamic().then((mod) => setMapHooks(mod));
  }, []);

  if (!MapHooks?.useMap) return null;

  const Inner = () => {
    const map = MapHooks.useMap();

    useMemo(() => {
      if (!points?.length) return;
      const bounds = L.latLngBounds(points);
      map.fitBounds(bounds, { padding: [80, 80] });
    }, [map, points]);

    return null;
  };

  return <Inner />;
}

function AmenityIcon({ Icon }) {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2FAE77] text-[#2FAE77]">
      <Icon size={18} strokeWidth={2} />
    </div>
  );
}

export default function TownshipMap({
  mapConfig,
  amenities,
  highways,
  selectedAmenity,
  setSelectedAmenity,
}) {
  const [highwayEnabled, setHighwayEnabled] = useState(true);
  const [amenityEnabled, setAmenityEnabled] = useState(true);

  const defaultCenter = {
    lat: Number(mapConfig?.mapCenterLat || mapConfig?.mapPinLat || 3.319),
    lng: Number(mapConfig?.mapCenterLong || mapConfig?.mapPinLng || 101.576),
  };

  const pinPosition = {
    lat: Number(mapConfig?.mapPinLat || defaultCenter.lat),
    lng: Number(mapConfig?.mapPinLng || defaultCenter.lng),
  };

  const allPoints = useMemo(() => {
    const points = [pinPosition];
    amenities.forEach((item) => {
      if (
        item?.coordinates &&
        !Number.isNaN(item.coordinates.lat) &&
        !Number.isNaN(item.coordinates.lng)
      ) {
        points.push(item.coordinates);
      }
    });
    return points;
  }, [amenities, pinPosition]);

  const groupedAmenities = useMemo(() => {
    const map = {};
    amenities.forEach((item) => {
      const category = Array.isArray(item.category)
        ? item.category[0]
        : item.category || "OTHER";

      if (!map[category]) map[category] = [];
      map[category].push(item);
    });
    return map;
  }, [amenities]);

  const amenityCategories = useMemo(
    () => Object.keys(groupedAmenities),
    [groupedAmenities]
  );

  const townshipBadge = useMemo(
    () => createTownshipBadge(mapConfig?.mapPinLabel || "GAMUDA GARDENS"),
    [mapConfig?.mapPinLabel]
  );

  return (
    <section className="w-full bg-white">
      <style jsx global>{`
        .leaflet-control-attribution {
          display: none !important;
        }
      `}</style>

      <div className="relative mx-auto h-[720px] w-full overflow-hidden rounded-[28px] bg-[#e9e4d8] shadow-[0_18px_40px_rgba(0,0,0,0.14)] lg:h-[685px]">
        <div className="absolute inset-0 z-0">
          <MapContainer
            center={[defaultCenter.lat, defaultCenter.lng]}
            zoom={13}
            style={{ width: "100%", height: "100%" }}
            zoomControl={true}
            className="h-full w-full"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {allPoints.length > 0 && <FitBounds points={allPoints} />}

            <Marker
              position={[pinPosition.lat, pinPosition.lng]}
              icon={townshipBadge}
            />

            {amenityEnabled &&
              amenities.map((amenity) => {
                const category = Array.isArray(amenity.category)
                  ? amenity.category[0]
                  : amenity.category || "OTHER";

                const pinType = categoryColorMap[category] || "green";
                const icon = createAmenityIcon(pinType);

                return (
                  <Marker
                    key={amenity.id}
                    position={[amenity.coordinates.lat, amenity.coordinates.lng]}
                    icon={icon}
                    eventHandlers={{
                      click: () => setSelectedAmenity(amenity),
                    }}
                  >
                    <Popup>
                      <div className="min-w-[180px] p-1">
                        <h4 className="text-sm font-semibold text-[#1a3a2a]">
                          {amenity.name}
                        </h4>
                        <p className="mt-1 text-xs text-gray-600">{category}</p>
                        {amenity.distance && (
                          <p className="mt-1 text-xs text-gray-500">
                            Distance: {amenity.distance}
                          </p>
                        )}
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
          </MapContainer>
        </div>

        <div className="pointer-events-none absolute inset-0 z-10 bg-white/10" />

        <div className="absolute left-6 top-6 z-30 w-[340px] rounded-[26px] bg-[#f3f2f0] p-7 shadow-[0_20px_40px_rgba(0,0,0,0.12)] md:left-12 md:top-12 md:w-[360px]">
          <div className="mb-8 flex items-center justify-between">
            <h3 className="text-[22px] font-extrabold uppercase tracking-wide text-black">
              Highway
            </h3>

            <button
              type="button"
              onClick={() => setHighwayEnabled((prev) => !prev)}
              className={`relative h-[28px] w-[64px] rounded-full transition ${
                highwayEnabled ? "bg-[#7c7b7a]" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-[3px] h-[22px] w-[22px] rounded-full bg-white shadow transition ${
                  highwayEnabled ? "left-[39px]" : "left-[3px]"
                }`}
              />
            </button>
          </div>

          <div className="space-y-5">
            {highways.length === 0 ? (
              <p className="text-sm text-gray-500">No highways available.</p>
            ) : highwayEnabled ? (
              highways.map((item) => (
                <div key={item.id} className="flex items-center gap-6">
                  <span
                    className="block h-[5px] w-[52px] rounded-full"
                    style={{ backgroundColor: item.linecolor || "#42B58B" }}
                  />
                  <span className="text-[14px] font-medium uppercase tracking-[0.02em] text-[#1e1e1e]">
                    {item.name}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">Highway list hidden.</p>
            )}
          </div>
        </div>

        <div className="absolute left-6 top-[210px] z-30 w-[340px] rounded-[26px] bg-[#f3f2f0] p-7 shadow-[0_20px_40px_rgba(0,0,0,0.12)] md:left-12 md:top-[255px] md:w-[360px]">
          <div className="mb-8 flex items-center justify-between">
            <h3 className="text-[22px] font-extrabold uppercase tracking-wide text-black">
              Amenities
            </h3>

            <button
              type="button"
              onClick={() => setAmenityEnabled((prev) => !prev)}
              className={`relative h-[28px] w-[64px] rounded-full transition ${
                amenityEnabled ? "bg-[#7c7b7a]" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-[3px] h-[22px] w-[22px] rounded-full bg-white shadow transition ${
                  amenityEnabled ? "left-[39px]" : "left-[3px]"
                }`}
              />
            </button>
          </div>

          <div className="space-y-5">
            {amenityCategories.length === 0 ? (
              <p className="text-sm text-gray-500">No amenities available.</p>
            ) : amenityEnabled ? (
              amenityCategories.map((label) => {
                const Icon = amenityCategoryIcons[label] || MapPinIcon;

                return (
                  <div key={label} className="flex items-center gap-4">
                    <AmenityIcon Icon={Icon} />
                    <span className="text-[14px] font-medium uppercase tracking-[0.03em] text-[#1d1d1d]">
                      {label}
                    </span>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-gray-500">Amenity list hidden.</p>
            )}
          </div>
        </div>
      </div>

      {selectedAmenity && (
        <div className="mt-6 rounded-[22px] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
          <p className="text-xs uppercase tracking-wide text-[#42B58B]">
            {Array.isArray(selectedAmenity.category)
              ? selectedAmenity.category[0]
              : selectedAmenity.category}
          </p>
          <h4 className="mt-1 text-lg font-semibold text-[#1a3a2a]">
            {selectedAmenity.name}
          </h4>
          {selectedAmenity.distance && (
            <p className="mt-2 text-sm text-gray-500">
              {selectedAmenity.distance}
            </p>
          )}
        </div>
      )}
    </section>
  );
}