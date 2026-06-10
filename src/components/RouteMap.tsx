import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import { divIcon } from "leaflet";
import type { RoutePoint } from "../db/types";

interface RouteMapProps {
  points: RoutePoint[];
}

function numberedIcon(n: number) {
  return divIcon({
    html: `<div style="
      background:#22c55e;color:#fff;border-radius:50%;
      width:28px;height:28px;display:flex;align-items:center;
      justify-content:center;font-weight:bold;font-size:13px;
      border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.4);">${n}</div>`,
    className: "",
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

export function RouteMap({ points }: RouteMapProps) {
  if (!points.length) return <p className="text-gray-500 text-sm">Sin ruta disponible</p>;

  const positions: [number, number][] = points.map((p) => [p.lat, p.lng]);
  const center = positions[0];

  return (
    <MapContainer
      center={center}
      zoom={14}
      style={{ height: "400px", width: "100%", borderRadius: "8px" }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline positions={positions} color="#22c55e" weight={3} />
      {points.map((p) => (
        <Marker key={p.order} position={[p.lat, p.lng]} icon={numberedIcon(p.order)}>
          <Popup>
            <strong>Parada {p.order}</strong><br />{p.label}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
