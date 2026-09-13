export type MuseumMediaType = 'fotografija' | 'zemljevid' | 'dokument' | 'video' | 'avdio' | 'drugo';

export type MuseumMedia = {
  id: string;
  type: MuseumMediaType;
  title: string;
  url: string;
  sourceId: string;
  alt?: string;
  caption?: string;
  creator?: string;
  license?: string;
  date?: string;
};

/**
 * Media is kept separate from entities and sources so one source can support
 * multiple representations and the same media can later be reused by several
 * museum records without duplicating provenance metadata.
 */
export const museumMedia: MuseumMedia[] = [];

export const mediaById = new Map(museumMedia.map((media) => [media.id, media]));
