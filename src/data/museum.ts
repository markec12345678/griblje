export type MuseumCategory = 'KRAJ' | 'KOLPA' | 'VOJNA' | 'LJUDJE' | 'HIŠE' | 'PREDMETI' | 'SPOMINI';

export type MuseumStatus = 'osnovni zapis' | 'potrebna dokumentacija' | 'preverjeno';

export type MuseumRecord = {
  id: string;
  title: string;
  category: MuseumCategory;
  period: string;
  location: string;
  description: string;
  source: string;
  status: MuseumStatus;
  image?: string;
  relatedIds?: string[];
};

export type MuseumLayer = {
  id: string;
  label: string;
  description: string;
  status: 'aktivno' | 'v pripravi';
};

/**
 * Curatorial model for the Griblje digital collection.
 * A record is a museum object, not merely a content card.
 */
export const collectionLayers: MuseumLayer[] = [
  { id: 'kraji', label: 'Kraji', description: 'Cerkev, Kolpa, ribnik, poti, narava in druge točke vasi.', status: 'aktivno' },
  { id: 'ljudje', label: 'Ljudje', description: 'Domačini, družine, poklici, pričevanja in življenjske zgodbe.', status: 'v pripravi' },
  { id: 'hise', label: 'Hiše', description: 'Domačije in stavbe skozi čas, z zgodovino, fotografijami in spremembami.', status: 'v pripravi' },
  { id: 'predmeti', label: 'Predmeti', description: 'Orodje, gospodinjski predmeti, fotografije, dokumenti in drugi materialni viri.', status: 'v pripravi' },
  { id: 'zgodbe', label: 'Zgodbe', description: 'Spomini, ustna zgodovina in pripovedi, vedno označene glede na izvor.', status: 'v pripravi' },
  { id: 'dogodki', label: 'Dogodki', description: 'Pomembni dogodki, prazniki, delo, nesreče, vojne in skupnostno življenje.', status: 'v pripravi' },
];

/**
 * Starter records for the next museum phase.
 * Deliberately avoids inventing names of local people or house histories.
 */
export const museumRecords: MuseumRecord[] = [
  {
    id: 'sveti-vid',
    title: 'Cerkev sv. Vida',
    category: 'KRAJ',
    period: 'Danes / dediščina',
    location: 'Središče Gribelj',
    description: 'Krajevna točka, ki bo povezana z zgodovinskimi viri, fotografijami in morebitnimi pričevanji.',
    source: 'Wikimedia Commons + prihodnji lokalni viri',
    status: 'osnovni zapis',
  },
  {
    id: 'kolpa',
    title: 'Kolpa pri Gribljah',
    category: 'KOLPA',
    period: 'Naravna in kulturna dediščina',
    location: 'Kolpa',
    description: 'Prostor, skozi katerega bomo povezali naravo, delo, prosti čas, mejo in spomine domačinov.',
    source: 'Wikimedia Commons + prihodnji lokalni viri',
    status: 'osnovni zapis',
  },
  {
    id: '1945-pilot',
    title: 'Pogovor angleškega pilota s partizani',
    category: 'VOJNA',
    period: 'Marec 1945',
    location: 'Griblje',
    description: 'Fotografski dokument, ki bo povezan z arhivskimi viri in preverjenim zgodovinskim kontekstom.',
    source: 'Wikimedia Commons + arhivski viri',
    status: 'potrebna dokumentacija',
  },
];

export const curatorialPrinciples = [
  'Vsak zapis ima izvor.',
  'Dokumentirano dejstvo ločujemo od pričevanja in spomina.',
  'Fotografija je predmet zbirke, ne samodejno dokaz vseh trditev o njej.',
  'Zbirka se gradi skupaj z ljudmi, ki poznajo vas.',
  'Osebne podatke objavljamo samo, kadar obstaja ustrezna podlaga in namen.',
  'Vsak zapis lahko kasneje dopolnimo, popravimo ali povežemo z novim virom.',
] as const;
