import { type MuseumSource } from './provenance';

export type MuseumCategory = 'KRAJ' | 'KOLPA' | 'VOJNA' | 'LJUDJE' | 'HIŠE' | 'PREDMETI' | 'SPOMINI';

export type MuseumStatus = 'osnovni zapis' | 'potrebna dokumentacija' | 'preverjeno';

export type MuseumRecord = {
  id: string;
  title: string;
  category: MuseumCategory;
  period: string;
  location: string;
  description: string;
  /** Legacy display field kept for compatibility; sourceIds are canonical. */
  source: string;
  sourceIds: string[];
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

export const collectionLayers: MuseumLayer[] = [
  { id: 'kraji', label: 'Kraji', description: 'Cerkev, Kolpa, ribnik, poti, narava in druge točke vasi.', status: 'aktivno' },
  { id: 'ljudje', label: 'Ljudje', description: 'Domačini, družine, poklici, pričevanja in življenjske zgodbe.', status: 'v pripravi' },
  { id: 'hise', label: 'Hiše', description: 'Domačije in stavbe skozi čas, z zgodovino, fotografijami in spremembami.', status: 'v pripravi' },
  { id: 'predmeti', label: 'Predmeti', description: 'Orodje, gospodinjski predmeti, fotografije, dokumenti in drugi materialni viri.', status: 'v pripravi' },
  { id: 'zgodbe', label: 'Zgodbe', description: 'Spomini, ustna zgodovina in pripovedi, vedno označene glede na izvor.', status: 'v pripravi' },
  { id: 'dogodki', label: 'Dogodki', description: 'Pomembni dogodki, prazniki, delo, nesreče, vojne in skupnostno življenje.', status: 'v pripravi' },
];

const WIKIMEDIA = 'Wikimedia Commons';
const WIKIMEDIA_LOCAL = 'Wikimedia Commons + prihodnji lokalni viri';
const WIKIMEDIA_ARCHIVE = 'Wikimedia Commons + arhivski viri';

export const museumRecords: MuseumRecord[] = [
  {
    id: 'sveti-vid', title: 'Cerkev sv. Vida', category: 'KRAJ', period: 'Danes / dediščina', location: 'Središče Gribelj',
    description: 'Krajevna točka, ki bo povezana z zgodovinskimi viri, fotografijami in morebitnimi pričevanji.',
    source: WIKIMEDIA_LOCAL, sourceIds: ['src-wikimedia-sv-vid'], status: 'osnovni zapis',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Griblje%2C_%C4%8Crnomelj_-_cerkev_sv._Vida.jpg', relatedIds: [],
  },
  {
    id: 'kolpa', title: 'Kolpa pri Gribljah', category: 'KOLPA', period: 'Naravna dediščina', location: 'Kolpa',
    description: 'Prostor, skozi katerega bomo povezali naravo, vodo, delo, prosti čas, mejo in spomine domačinov.',
    source: WIKIMEDIA_LOCAL, sourceIds: ['src-wikimedia-kolpa'], status: 'osnovni zapis',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Kolpa_griblje.jpg', relatedIds: ['malenca', 'meja'],
  },
  {
    id: 'malenca', title: 'Malenca na Kolpi', category: 'KOLPA', period: 'Gospodarska dediščina', location: 'Kolpa pri Gribljah',
    description: 'Zapis o življenju in delu ob Kolpi. Končni muzejski zapis bo povezan z dokumentiranimi podatki, fotografijami in lokalnimi pričevanji.',
    source: WIKIMEDIA_LOCAL, sourceIds: ['src-wikimedia-malenca'], status: 'osnovni zapis',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Slap_in_malenca_na_Kolpi_pri_Gribljah.jpg', relatedIds: ['kolpa'],
  },
  {
    id: '1945-pilot', title: 'Pogovor angleškega pilota s partizani', category: 'VOJNA', period: 'Marec 1945', location: 'Griblje, marec 1945',
    description: 'Zgodovinska fotografija, povezana z dogajanjem v Gribljah marca 1945. Fotografija je muzejski dokument; širši kontekst mora biti vezan na preverljive arhivske vire.',
    source: WIKIMEDIA_ARCHIVE, sourceIds: ['src-wikimedia-1945-pilot'], status: 'potrebna dokumentacija',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Pogovor_angle%C5%A1kega_pilota_s_partizani%2C_Griblje_pri_%C4%8Crnomlju%2C_marec_1945.jpg', relatedIds: ['1945-ranjenci'],
  },
  {
    id: '1945-ranjenci', title: 'Ranjeni partizani in zavezniška letala', category: 'VOJNA', period: 'Marec 1945', location: 'Griblje, marec 1945',
    description: 'Fotografski dokument o dogajanju v Gribljah med drugo svetovno vojno. Pri končni objavi bodo posamezne zgodovinske trditve povezane z viri.',
    source: WIKIMEDIA_ARCHIVE, sourceIds: ['src-wikimedia-1945-ranjenci'], status: 'potrebna dokumentacija',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Ranjeni_partizani_opazujejo_pristajanje_zavezni%C5%A1kih_letal%2C_Griblje_pri_%C4%8Crnomlju%2C_marec_1945.jpg', relatedIds: ['1945-pilot'],
  },
  {
    id: 'meja', title: 'Meja ob Gribljah', category: 'KRAJ', period: 'Sodobna zgodovina', location: 'Ob Kolpi',
    description: 'Prostor ob Kolpi je skozi čas spreminjal svoj pomen. Muzej bo tukaj povezal sodobne fotografije, zemljevide, dokumente in pričevanja.',
    source: WIKIMEDIA_LOCAL, sourceIds: ['src-wikimedia-meja'], status: 'osnovni zapis',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Slovenian_border_fence_in_Griblje.JPG', relatedIds: ['kolpa'],
  },
  {
    id: 'panorama', title: 'Griblje – panorama', category: 'KRAJ', period: 'Sodobnost', location: 'Griblje',
    description: 'Pogled na vas kot muzejski predmet. Vsaka lokacija v vasi je lahko vstopna točka v zgodbo prostora.',
    source: WIKIMEDIA, sourceIds: ['src-wikimedia-panorama'], status: 'osnovni zapis',
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Griblje%2C_%C4%8Crnomelj.jpg', relatedIds: ['sveti-vid', 'kolpa'],
  },
  {
    id: 'ribnik', title: 'Ribnik Griblje', category: 'KOLPA', period: 'Narava', location: 'Griblje',
    description: 'Naravna in krajevna dediščina. Zbirka bo lahko vsebovala sezonske fotografije, podatke o naravi in spomine domačinov.',
    source: WIKIMEDIA_LOCAL, sourceIds: ['src-wikimedia-ribnik'], status: 'osnovni zapis',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Pond_Griblje.jpg', relatedIds: [],
  },
];

export type TimelineEntry = {
  year: string;
  title: string;
  text: string;
  sourceIds: string[];
  status: MuseumStatus;
};

export const timeline: TimelineEntry[] = [
  { year: 'ZGODNJA ZGODOVINA', title: 'Začetki kraja', text: 'Časovno os bomo gradili iz preverljivih zgodovinskih virov in jasno ločevali dokumentirano dejstvo od kasnejšega spomina ali pripovedi.', sourceIds: [], status: 'potrebna dokumentacija' },
  { year: '15.–16. STOLETJE', title: 'Mejni prostor', text: 'Obdobja mejnega prostora in zgodovine Bele krajine bodo predstavljena z viri, zemljevidi in kontekstom.', sourceIds: [], status: 'potrebna dokumentacija' },
  { year: 'MAREC 1945', title: 'Zavezniška letala', text: 'Griblje imajo ohranjene fotografske dokumente, povezane z dogodki marca 1945. To je ena osrednjih zgodovinskih zbirk projekta.', sourceIds: ['src-wikimedia-1945-pilot', 'src-wikimedia-1945-ranjenci'], status: 'potrebna dokumentacija' },
  { year: '1991 → DANES', title: 'Nova meja in sodobna vas', text: 'Sodobna zgodovina, življenje ob Kolpi, spremembe prostora in današnja identiteta Gribelj.', sourceIds: [], status: 'potrebna dokumentacija' },
];

export const curatorialPrinciples = [
  'Vsak zapis ima izvor.',
  'Dokumentirano dejstvo ločujemo od pričevanja in spomina.',
  'Fotografija je predmet zbirke, ne samodejno dokaz vseh trditev o njej.',
  'Zbirka se gradi skupaj z ljudmi, ki poznajo vas.',
  'Osebne podatke objavljamo samo, kadar obstaja ustrezna podlaga in namen.',
  'Vsak zapis lahko kasneje dopolnimo, popravimo ali povežemo z novim virom.',
] as const;
