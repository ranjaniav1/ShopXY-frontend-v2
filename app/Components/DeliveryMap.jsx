"use client";

import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";

// Fix marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

const DeliveryMap = ({ userLatLng }) => {
  const shopLatLng = [23.2539, 69.6674]; // Axis Bank Bharasar Bhuj (example)
  const [position, setPosition] = useState(shopLatLng);

  const path = [shopLatLng, userLatLng];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index >= 1) {
        clearInterval(interval);
        return;
      }

      // Simulate mid point (you can refine with more points)
      const midLat = (shopLatLng[0] + userLatLng[0]) / 2;
      const midLng = (shopLatLng[1] + userLatLng[1]) / 2;
      setPosition([midLat, midLng]);

      setTimeout(() => {
        setPosition(userLatLng); // Simulate arriving at the destination
      }, 3000);

      index++;
    }, 3000);

    return () => clearInterval(interval);
  }, [userLatLng]);

  return (
    <MapContainer center={shopLatLng} zoom={10} scrollWheelZoom={false} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={shopLatLng}></Marker>
      <Marker position={position}></Marker>
      <Polyline positions={path} color="blue" />
    </MapContainer>
  );
};

export default DeliveryMap;
