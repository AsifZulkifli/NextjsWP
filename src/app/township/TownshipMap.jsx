"use client";

import { useMemo, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const mapContainerStyle = {
  width: "100%",
  height: "680px",
  borderRadius: "28px",
  overflow: "hidden",
};

// Amenity marker icon (green dot)
const amenityIcon = L.divIcon({
  className: "custom-amenity-icon",
  html: '<div style="background-color: #42B58B; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"></div>',
  iconSize: [24, 24],
  popupAnchor: [0, -12],
});

// Township badge icon
const createBadgeIcon = (label) =>
  L.divIcon({
    className: "township-badge-icon",
    html: `
      <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
        <div style="background-color: #42B58B; width: 92px; height: 92px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; font-weight: bold; text-align: center; text-transform: uppercase; padding: 0 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
          <span style="display: inline-block; max-width: 80px;">${label}</span>
        </div>
        <div style="position: absolute; bottom: -12px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-top: 14px solid #42B58B;"></div>
      </div>
    `,
    iconSize: [92, 104],
    popupAnchor: [0, -52],
  });

// Helper component to fit bounds after map loads
function FitBounds({ points }) {
  const map = useMap();

  useEffect(() => {
    if (!points || points.length === 0) return;

    // Create a LatLngBounds object from the points
    const bounds = L.latLngBounds(points);

    // Fit the map to the bounds with some padding (e.g., 50 pixels)
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [map, points]);

  return null;
}

function TownshipMap({ mapConfig, amenities, highways, selectedAmenity, setSelectedAmenity }) {
  // Default center (fallback if no points)
  const defaultCenter = {
    lat: Number(mapConfig?.mapCenterLat || mapConfig?.mapPinLat || 3.319),
    lng: Number(mapConfig?.mapCenterLong || mapConfig?.mapPinLng || 101.576), // ✅ now uses mapCenterLong
  };
  const defaultZoom = Number(mapConfig?.mapZoom || 13);

  // Township pin position
  const pinPosition = {
    lat: Number(mapConfig?.mapPinLat || defaultCenter.lat),
    lng: Number(mapConfig?.mapPinLng || defaultCenter.lng),
  };

  // Group amenities by category for sidebar
  const groupedCategories = useMemo(() => {
    const map = {};
    amenities.forEach((item) => {
      const category = Array.isArray(item.category) ? item.category[0] : (item.category || "Other");
      if (!map[category]) map[category] = [];
      map[category].push(item);
    });
    return map;
  }, [amenities]);

  // Collect all points for auto‑zoom (township pin + all amenities)
  const allPoints = useMemo(() => {
    const points = [pinPosition];
    amenities.forEach((amenity) => {
      points.push(amenity.coordinates);
    });
    return points;
  }, [pinPosition, amenities]);

  const badgeIcon = useMemo(() => createBadgeIcon(mapConfig?.mapPinLabel || "Gamuda Gardens"), [mapConfig?.mapPinLabel]);

  // If there are no points (no amenities, no pin), fallback to default center/zoom.
  // The FitBounds component will handle auto‑zoom when points exist.
  const hasPoints = allPoints.length > 0;

  return (
    <div className="relative w-full" style={{ isolation: "isolate" }}>
      {/* Map container */}
      <div className="relative z-0 overflow-hidden rounded-[28px] shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
        <MapContainer
          center={hasPoints ? allPoints[0] : defaultCenter}
          zoom={hasPoints ? undefined : defaultZoom}
          style={mapContainerStyle}
          zoomControl={true}
          className="leaflet-container"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Fit bounds after map loads */}
          {hasPoints && <FitBounds points={allPoints} />}

          {/* Township badge marker */}
          <Marker position={pinPosition} icon={badgeIcon} />

          {/* Amenity markers */}
          {amenities.map((amenity) => (
            <Marker
              key={amenity.id}
              position={amenity.coordinates}
              icon={amenityIcon}
              eventHandlers={{ click: () => setSelectedAmenity(amenity) }}
            >
              {selectedAmenity?.id === amenity.id && (
                <Popup>
                  <div className="min-w-[180px] p-1">
                    <h4 className="text-sm font-semibold text-[#1a3a2a]">{amenity.name}</h4>
                    <p className="mt-1 text-xs text-gray-600">{amenity.category}</p>
                    {amenity.distance && <p className="mt-1 text-xs text-gray-500">Distance: {amenity.distance}</p>}
                  </div>
                </Popup>
              )}
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Sidebar – absolute with high z-index */}
      <div className="absolute left-4 top-4 z-50 flex w-[270px] flex-col gap-4 md:left-6 md:top-6">
        <div className="rounded-[22px] bg-[#ecebea] p-5 shadow-md">
          <h3 className="mb-3 text-[14px] font-bold uppercase tracking-wide text-[#1f1f1f]">Highway</h3>
          <div className="space-y-1">
            {highways.length === 0 ? (
              <p className="text-xs text-gray-500">No highways added.</p>
            ) : (
              highways.map((highway) => (
                <div key={highway.id} className="text-[13px] uppercase tracking-wide text-[#333]">
                  {highway.name}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-[22px] bg-[#ecebea] p-5 shadow-md">
          <h3 className="mb-3 text-[14px] font-bold uppercase tracking-wide text-[#1f1f1f]">Amenities</h3>
          <div className="space-y-1">
            {Object.keys(groupedCategories).length === 0 ? (
              <p className="text-xs text-gray-500">No amenities added.</p>
            ) : (
              Object.keys(groupedCategories).map((category) => (
                <div key={category} className="text-[13px] uppercase tracking-wide text-[#333]">
                  {category}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TownshipMap;