import { museumRecords } from './museum';
import { villageHouses, villagePeople, villageStories } from './entities';

export type CatalogKind = 'kraji' | 'hiše' | 'ljudje' | 'zgodbe' | 'predmeti' | 'dogodki';

export type CatalogEntry = {
  kind: CatalogKind;
  label: string;
  count: number;
  status: 'aktivno' | 'v pripravi';
  description: string;
};

/**
 * Single source for the collection overview. Empty categories are real empty
 * collections, not placeholders disguised as historical records.
 */
export const catalogEntries: CatalogEntry[] = [
  { kind: 'kraji', label: 'Kraji', count: museumRecords.filter((item) => item.category === 'KRAJ' || item.category === 'KOLPA').length, status: 'aktivno', description: 'Dokumentirane krajevne točke in naravna dediščina.' },
  { kind: 'hiše', label: 'Hiše', count: villageHouses.length, status: 'v pripravi', description: 'Domačije in stavbe bodo dodane šele z virom ali preverjeno lokalno dokumentacijo.' },
  { kind: 'ljudje', label: 'Ljudje', count: villagePeople.length, status: 'v pripravi', description: 'Biografski zapisi bodo dodani z ustreznim virom in dovoljenjem, kjer je potrebno.' },
  { kind: 'zgodbe', label: 'Zgodbe', count: villageStories.length, status: 'v pripravi', description: 'Pričevanja, spomini in dokumentirane zgodbe z jasno označenim izvorom.' },
  { kind: 'predmeti', label: 'Predmeti', count: 0, status: 'v pripravi', description: 'Fotografije, orodje, dokumenti in drugi materialni viri.' },
  { kind: 'dogodki', label: 'Dogodki', count: 0, status: 'v pripravi', description: 'Dogodki iz življenja vasi, zapisani na podlagi virov ali jasno označenih pričevanj.' },
];

export const catalogTotal = catalogEntries.reduce((total, entry) => total + entry.count, 0);
