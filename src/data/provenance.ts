export type SourceType =
  | 'arhivski-dokument'
  | 'fotografija'
  | 'zemljevid'
  | 'spletni-vir'
  | 'ustno-pričevanje'
  | 'spomin'
  | 'drugo';

export type SourceVerificationStatus =
  | 'nepreverjeno'
  | 'preverjeno'
  | 'delno-preverjeno';

export type MuseumSource = {
  id: string;
  type: SourceType;
  title: string;
  creator?: string;
  institution?: string;
  url?: string;
  citation?: string;
  license?: string;
  archiveReference?: string;
  accessedAt?: string;
  verificationStatus: SourceVerificationStatus;
  notes?: string;
};

/**
 * Source registry for the current collection.
 *
 * A source entry deliberately records uncertainty instead of filling missing
 * metadata with guesses. Curatorial verification can enrich these records
 * later without changing the museum entity model.
 */
export const museumSources: MuseumSource[] = [
  {
    id: 'src-wikimedia-sv-vid',
    type: 'fotografija',
    title: 'Griblje, Črnomelj – cerkev sv. Vida',
    institution: 'Wikimedia Commons',
    url: 'https://commons.wikimedia.org/wiki/File:Griblje,_Črnomelj_-_cerkev_sv._Vida.jpg',
    verificationStatus: 'delno-preverjeno',
    notes: 'Avtor in licenca sta preverljiva na strani datoteke; attribution naj se prikaže v muzejski kartici vira.',
  },
  {
    id: 'src-wikimedia-kolpa',
    type: 'fotografija',
    title: 'Kolpa pri Gribljah',
    institution: 'Wikimedia Commons',
    url: 'https://commons.wikimedia.org/wiki/File:Kolpa_griblje.jpg',
    verificationStatus: 'nepreverjeno',
  },
  {
    id: 'src-wikimedia-malenca',
    type: 'fotografija',
    title: 'Slap in malenca na Kolpi pri Gribljah',
    institution: 'Wikimedia Commons',
    url: 'https://commons.wikimedia.org/wiki/File:Slap_in_malenca_na_Kolpi_pri_Gribljah.jpg',
    verificationStatus: 'delno-preverjeno',
    notes: 'Licenčni podatki obstajajo na strani datoteke; pred javno muzejsko objavo jih je treba prenesti v strukturirani metadata zapis.',
  },
  {
    id: 'src-wikimedia-1945-pilot',
    type: 'fotografija',
    title: 'Pogovor angleškega pilota s partizani, Griblje pri Črnomlju, marec 1945',
    institution: 'Wikimedia Commons',
    url: 'https://commons.wikimedia.org/wiki/File:Pogovor_angleškega_pilota_s_partizani,_Griblje_pri_Črnomlju,_marec_1945.jpg',
    verificationStatus: 'delno-preverjeno',
    notes: 'Fotografija je preverjena kot muzejski vizualni vir; zgodovinski kontekst zahteva ločen arhivski dokaz.',
  },
  {
    id: 'src-wikimedia-1945-ranjenci',
    type: 'fotografija',
    title: 'Ranjeni partizani opazujejo pristajanje zavezniških letal, Griblje pri Črnomlju, marec 1945',
    institution: 'Wikimedia Commons',
    url: 'https://commons.wikimedia.org/wiki/File:Ranjeni_partizani_opazujejo_pristajanje_zavezniških_letal,_Griblje_pri_Črnomlju,_marec_1945.jpg',
    verificationStatus: 'delno-preverjeno',
    notes: 'Fotografija je preverjena kot muzejski vizualni vir; širši zgodovinski kontekst zahteva ločen arhivski dokaz.',
  },
  {
    id: 'src-wikimedia-meja',
    type: 'fotografija',
    title: 'Slovenian border fence in Griblje',
    institution: 'Wikimedia Commons',
    url: 'https://commons.wikimedia.org/wiki/File:Slovenian_border_fence_in_Griblje.JPG',
    verificationStatus: 'delno-preverjeno',
  },
  {
    id: 'src-wikimedia-panorama',
    type: 'fotografija',
    title: 'Griblje, Črnomelj',
    institution: 'Wikimedia Commons',
    url: 'https://commons.wikimedia.org/wiki/File:Griblje,_Črnomelj.jpg',
    verificationStatus: 'nepreverjeno',
  },
  {
    id: 'src-wikimedia-ribnik',
    type: 'fotografija',
    title: 'Pond Griblje',
    institution: 'Wikimedia Commons',
    url: 'https://commons.wikimedia.org/wiki/File:Pond_Griblje.jpg',
    verificationStatus: 'nepreverjeno',
  },
];

export const sourceById = new Map(museumSources.map((source) => [source.id, source]));
