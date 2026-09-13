import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { MuseumRecord } from '../data/museum';
import type { MapLayer, VillageMapPoint } from '../data/map';

type Props = { points: VillageMapPoint[]; layer: MapLayer; records: MuseumRecord[]; onSelect: (record: MuseumRecord) => void };
const CENTER: L.LatLngExpression = [45.57246, 15.29257];

export function VillageMap({ points, layer, records, onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, { center: CENTER, zoom: 14, minZoom: 12, maxZoom: 18 });
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; OpenStreetMap contributors' }).addTo(map);
    markersRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;
    const resize = () => map.invalidateSize();
    window.addEventListener('resize', resize);
    setTimeout(resize, 0);
    return () => { window.removeEventListener('resize', resize); map.remove(); mapRef.current = null; markersRef.current = null; };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const group = markersRef.current;
    if (!map || !group) return;
    group.clearLayers();
    const verified = points.filter((p) => p.verified && p.lat != null && p.lng != null);
    verified.forEach((point) => {
      const record = records.find((item) => item.id === point.id);
      const marker = L.circleMarker([point.lat!, point.lng!], { radius: 8, color: '#fff', weight: 2, fillColor: '#ff2a2a', fillOpacity: 1 }).addTo(group);
      marker.bindTooltip(point.title, { direction: 'top', offset: [0, -8] });
      marker.on('click', () => record && onSelect(record));
    });
    if (verified.length > 1) {
      const bounds = L.latLngBounds(verified.map((p) => [p.lat!, p.lng!] as L.LatLngTuple));
      map.fitBounds(bounds.pad(0.45), { maxZoom: 15, animate: false });
    } else if (verified.length === 1) map.setView([verified[0].lat!, verified[0].lng!], 14);
  }, [points, layer, records, onSelect]);

  const unverified = points.filter((p) => !p.verified || p.lat == null || p.lng == null);
  return <div className="relative h-[430px] w-full bg-[#111]">
    <div ref={containerRef} className="absolute inset-0" />
    <div className="absolute top-3 left-3 z-[500] border border-neutral-700 bg-black/90 px-3 py-2 font-mono text-[9px] uppercase text-neutral-300">Sloj: {layer}</div>
    {unverified.length > 0 && <div className="absolute bottom-3 left-3 right-3 z-[500] border border-amber-500/40 bg-black/90 px-3 py-2 font-mono text-[9px] uppercase text-amber-200">{unverified.length} lokacija še nima preverjenih koordinat.</div>}
  </div>;
}
