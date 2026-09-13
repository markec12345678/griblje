import type { MuseumStatus } from './museum';

export type MuseumEntityType =
  | 'kraj'
  | 'hisa'
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

export const museumRelationships: MuseumRelationship[] = [];
export const museumEntities: MuseumEntity[] = [];

export function getEntityById(entityId: string) {
  return museumEntities.find((entity) => entity.id === entityId);
}

export function getRelationshipsForEntity(entityId: string) {
  return museumRelationships.filter(
    (relationship) => relationship.from === entityId || relationship.to === entityId,
  );
}

export function getRelatedEntityIds(entityId: string) {
  return getRelationshipsForEntity(entityId).map((relationship) =>
    relationship.from === entityId ? relationship.to : relationship.from,
  );
}
