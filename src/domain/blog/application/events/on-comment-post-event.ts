import { UniquieEntityId } from '@/core/entities/uniquie-entity-id'
import { DomainEvent } from '@/core/events/domain-event'
import { Comment } from '../../enterprise/entities/comment'

export class OnCommentCreatedEvent implements DomainEvent {
  public occuredAt: Date
  public comment: Comment

  constructor(comment: Comment) {
    this.comment = comment
    this.occuredAt = new Date()
  }

  getAggregatedId(): UniquieEntityId {
    return this.comment.id
  }
}
