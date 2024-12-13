import { UniquieEntityId } from '../entities/uniquie-entity-id'

export interface DomainEvent {
  occuredAt: Date
  getAggregatedId(): UniquieEntityId
}
