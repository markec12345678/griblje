export type MapLayer = 'KRAJI' | 'HIŠE' | 'LJUDJE' | 'ZGODBE' | 'PREDMETI' | 'DOGODKI';

export type VillageMapPoint = {
  id: string;
  title: string;
  layer: MapLayer;
  description: string;
  /** Coordinates are intentionally optional until verified from a reliable source. */
  lat?: number;
  lng?: number;
  verified: boolean;
  relatedIds: string[];
};

/**
 * The first map layer is deliberately conservative: no invented coordinates.
 * A point becomes mappable only after its location has been verified.
 */
export const villageMapPoints: VillageMapPoint[] = [
  {
    id: 'sveti-vid',
    title: 'Cerkev sv. Vida',
    layer: 'KRAJI',
    description: 'Krajevna točka v središču muzejske zbirke.',
    verified: false,
    relatedIds: [],
  },
  {
    id: 'kolpa',
    title: 'Kolpa pri Gribljah',
    layer: 'KRAJI',
    description: 'Prostor ob Kolpi kot naravna, gospodarska in družbena dediščina.',
    verified: false,
    relatedIds: [],
  },
  {
    id: 'malenca',
    title: 'Malenca na Kolpi',
    layer: 'KRAJI',
    description: 'Lokacija, ki jo bomo povezali z zgodovino dela in življenja ob Kolpi.',
    verified: false,
    relatedIds: [],
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
