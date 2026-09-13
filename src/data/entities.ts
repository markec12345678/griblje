export type EntityStatus = 'osnovni zapis' | 'potrebna dokumentacija' | 'preverjeno';

export type VillageHouse = {
  id: string;
  title: string;
  addressOrLabel: string;
  description: string;
  period: string;
  locationStatus: 'nepreverjeno' | 'preverjeno';
  lat?: number;
  lng?: number;
  source?: string;
  status: EntityStatus;
  relatedPeopleIds: string[];
  relatedStoryIds: string[];
  relatedRecordIds: string[];
};

export type VillagePerson = {
  id: string;
  name: string;
  description: string;
  period: string;
  role?: string;
  source?: string;
  status: EntityStatus;
  relatedHouseIds: string[];
  relatedStoryIds: string[];
};

export type VillageStory = {
  id: string;
  title: string;
  summary: string;
  storyType: 'pričevanje' | 'dokument' | 'spomin' | 'dogodek';
  source?: string;
  status: EntityStatus;
  relatedHouseIds: string[];
  relatedPersonIds: string[];
  relatedRecordIds: string[];
};

/**
 * Intentional empty collections: no house, person or oral-history entry is
 * invented until it has a source or a clearly attributed local testimony.
 */
export const villageHouses: VillageHouse[] = [];
export const villagePeople: VillagePerson[] = [];
export const villageStories: VillageStory[] = [];
