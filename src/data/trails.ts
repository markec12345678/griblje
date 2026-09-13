export type MuseumTrail = {
  id: string;
  title: string;
  description: string;
  recordIds: string[];
};

/**
 * Curated paths through the existing collection. Trails reference only
 * records that already exist; they do not create new historical claims.
 */
export const museumTrails: MuseumTrail[] = [
  {
    id: 'ob-kolpi',
    title: 'Ob Kolpi',
    description: 'Od naravne dediščine do malence in prostora ob vodi.',
    recordIds: ['kolpa', 'malenca', 'meja'],
  },
  {
    id: 'marec-1945',
    title: 'Griblje, marec 1945',
    description: 'Fotografska sled obstoječih zapisov o dogajanju marca 1945.',
    recordIds: ['1945-pilot', '1945-ranjenci'],
  },
  {
    id: 'vas-kot-eksponat',
    title: 'Vas kot eksponat',
    description: 'Središče naselja, cerkev in pogled na Griblje.',
    recordIds: ['sveti-vid', 'panorama'],
  },
];
