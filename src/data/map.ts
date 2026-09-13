export type MapLayer = 'KRAJI' | 'HIŠE' | 'LJUDJE' | 'ZGODBE' | 'PREDMETI' | 'DOGODKI';

export type VillageMapPoint = {
  id: string;
  title: string;
  layer: MapLayer;
  description: string;
  lat?: number;
  lng?: number;
  verified: boolean;
  source?: string;
  relatedIds: string[];
};

/**
 * Coordinates are only stored when they can be tied to an identifiable source.
 * A coordinate for a nearby place is never silently reused for another object.
 */
export const villageMapPoints: VillageMapPoint[] = [
  {
    id: 'griblje-center',
    title: 'Griblje – središče naselja',
    layer: 'KRAJI',
    description: 'Referenčna točka naselja Griblje; uporablja se za orientacijo zemljevida, ne kot koordinata posamezne hiše.',
    lat: 45.57246,
    lng: 15.29257,
    verified: true,
    source: 'Wikidata / OpenStreetMap referenca za naselje Griblje',
    relatedIds: ['panorama', 'sveti-vid'],
  },
  {
    id: 'kolpa',
    title: 'Kolpa pri Gribljah',
    layer: 'KRAJI',
    description: 'Preverjena točka državnega monitoringa kopalne vode na območju Kolpe pri Gribljah.',
    lat: 45.5688,
    lng: 15.2988,
    verified: true,
    source: 'GOV.SI – Profil kopalne vode Kolpa, Dragoši–Griblje; merilno mesto K05010',
    relatedIds: ['kolpa'],
  },
  {
    id: 'malenca',
    title: 'Malenca na Kolpi',
    layer: 'KRAJI',
    description: 'Lokacija je vključena v muzejski zemljevid, vendar brez koordinat, dokler položaj konkretne malence ne bo potrjen z zanesljivim virom.',
    verified: false,
    relatedIds: ['malenca', 'kolpa'],
  },
];

export const mapLayers: { id: MapLayer; label: string }[] = [
  { id: 'KRAJI', label: 'Kraji' },
  { id: 'HIŠE', label: 'Hiše' },
  { id: 'LJUDJE', label: 'Ljudje' },
  { id: 'ZGODBE', label: 'Zgodbe' },
  { id: 'PREDMETI', label: 'Predmeti' },
  { id: 'DOGODKI', label: 'Dogodki' },
];
