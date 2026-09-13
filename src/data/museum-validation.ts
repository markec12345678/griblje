import { museumRecords } from './museum';
import { museumSources, sourceById } from './provenance';
import { museumEntities, museumRelationships } from './museum-model';

export type MuseumValidationIssue = {
  severity: 'error' | 'warning';
  code: string;
  message: string;
  entityId?: string;
};

/**
 * Read-only integrity checks for the museum collection.
 * These checks deliberately report missing evidence instead of silently
 * repairing it, because museum data must never be "fixed" by guessing.
 */
export function validateMuseumData(): MuseumValidationIssue[] {
  const issues: MuseumValidationIssue[] = [];
  const entityIds = new Set(museumEntities.map((entity) => entity.id));
  const recordIds = new Set(museumRecords.map((record) => record.id));

  for (const record of museumRecords) {
    for (const sourceId of record.sourceIds) {
      if (!sourceById.has(sourceId)) {
        issues.push({
          severity: 'error',
          code: 'MISSING_SOURCE',
          message: `Record ${record.id} references unknown source ${sourceId}.`,
          entityId: record.id,
        });
      }
    }
  }

  for (const relationship of museumRelationships) {
    const fromExists = entityIds.has(relationship.from) || recordIds.has(relationship.from);
    const toExists = entityIds.has(relationship.to) || recordIds.has(relationship.to);

    if (!fromExists || !toExists) {
      issues.push({
        severity: 'error',
        code: 'MISSING_RELATION_ENDPOINT',
        message: `Relationship ${relationship.id} references an unknown endpoint.`,
      });
    }

    if (relationship.sourceIds.length === 0) {
      issues.push({
        severity: 'warning',
        code: 'UNSUPPORTED_RELATIONSHIP',
        message: `Relationship ${relationship.id} has no supporting source.`,
      });
    }

    for (const sourceId of relationship.sourceIds) {
      if (!sourceById.has(sourceId)) {
        issues.push({
          severity: 'error',
          code: 'MISSING_RELATION_SOURCE',
          message: `Relationship ${relationship.id} references unknown source ${sourceId}.`,
        });
      }
    }
  }

  for (const entity of museumEntities) {
    for (const sourceId of entity.sourceIds) {
      if (!sourceById.has(sourceId)) {
        issues.push({
          severity: 'error',
          code: 'MISSING_ENTITY_SOURCE',
          message: `Entity ${entity.id} references unknown source ${sourceId}.`,
          entityId: entity.id,
        });
      }
    }
  }

  if (museumSources.length === 0) {
    issues.push({ severity: 'warning', code: 'EMPTY_SOURCE_REGISTRY', message: 'The museum has no registered sources.' });
  }

  return issues;
}
