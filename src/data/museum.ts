export type MuseumCategory = 'KRAJ' | 'KOLPA' | 'VOJNA' | 'LJUDJE' | 'HIŠE' | 'PREDMETI' | 'SPOMINI';

export type MuseumRecord = {
  id: string;
  title: string;
  category: MuseumCategory;
  period: string;
  location: string;
  description: string;
  source: string;
  status: 'osnovni zapis' | 'potrebna dokumentacija' | 'preverjeno';
  image?: string;
};

/**
 * Curatorial model for the future Griblje digital collection.
 * New records should identify provenance and verification status rather than
 * presenting an unverified local story as established fact.
 */
export const collectionLayers = [
  { id: 'kraji', label: 'Kraji', description: 'Cerkev, Kolpa, ribnik, poti, narava in druge točke vasi.' },
  { id: 'ljudje', label: 'Ljudje', description: 'Domačini, družine, poklici, pričevanja in življenjske zgodbe.' },
  { id: 'hise', label: 'Hiše', description: 'Domačije in stavbe skozi čas, z zgodovino, fotografijami in spremembami.' },
  { id: 'predmeti', label: 'Predmeti', description: 'Orodje, gospodinjski predmeti, fotografije, dokumenti in drugi materialni viri.' },
  { id: 'zgodbe', label: 'Zgodbe', description: 'Spomini, ustna zgodovina in pripovedi, vedno označene glede na izvor.' },
  { id: 'dogodki', label: 'Dogodki', description: 'Pomembni dogodki, prazniki, delo, nesreče, vojne in skupnostno življenje.' },
] as const;

export const curatorialPrinciples = [
  'Vsak zapis ima izvor.',
  'Dokumentirano dejstvo ločujemo od pričevanja in spomina.',
  'Fotografija je predmet zbirke, ne samodejno dokaz vseh trditev o njej.',
  'Zbirka se gradi skupaj z ljudmi, ki poznajo vas.',
  'Vsak zapis lahko kasneje dopolnimo, popravimo ali povežemo z novim virom.',
] as const;
