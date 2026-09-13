import type { MuseumStatus } from './museum';

export type MuseumEntityType =
  | 'kraj'
  | 'hiša'
  | 'oseba'
  | 'predmet'
  | 'zgodba'
  | 'dogodek'
  | 'medij';

export type MuseumEvidenceStatus =
  | 'DOCUMENTED'
  | 'CORROBORATED'
  | 'TESTIMONY'
  | 'TRADITION'
  | 'UNVERIFIED'
  | 'DISPUTED';

export type MuseumEntity = {
  id: string;
  type: MuseumEntityType;
  title: string;
  description: string;
  period?: string;
  location?: string;
  status: MuseumStatus;
  evidenceStatus: MuseumEvidenceStatus;
  sourceIds: string[];
  mediaIds: string[];
  notes?: string[];
};

export type MuseumRelationshipType =
  | 'located-in'
  | 'part-of'
  | 'lived-in-by'
  | 'owned-by'
  | 'created-by'
  | 'depicts'
  | 'documents'
  | 'associated-with'
  | 'has-story'
  | 'occurred-at'
  | 'occurred-during'
  | 'supported-by';

export type MuseumRelationship = {
  id: string;
  from: string;
  relation: MuseumRelationshipType;
  to: string;
  sourceIds: string[];
  evidenceStatus: MuseumEvidenceStatus;
  notes?: string[];
};

/**
 * Canonical relationship registry.
 *
 * Keep this empty until a relationship can be supported by a source or an
 * explicitly attributed local testimony. This prevents the graph from
 * turning plausible associations into undocumented historical facts.
 */
export const museumRelationships: MuseumRelationship[] = [];

/**
 * Canonical entity registry will be populated as curated entities are migrated
 * from the legacy collection models. Existing UI data remains untouched until
 * each entity has an appropriate evidence record.
 */
export const museumEntities: MuseumEntity[] = [];

export function getRelationshipsForEntity(entityId: string) {
  return museumRelationships.filter(
    (relationship) => relationship.from === entityId || relationship.to === entityId,
  );
}
