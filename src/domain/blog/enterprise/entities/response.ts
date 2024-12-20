import { Entity } from '@/core/entities/entity'
import { UniquieEntityId } from '@/core/entities/uniquie-entity-id'

export interface ResponseProps {
  authorId: UniquieEntityId
  content: string
  createdAt: Date
  updatedAt?: Date
}

export abstract class Response<
  Props extends ResponseProps,
> extends Entity<Props> {
  get authorId() {
    return this.props.authorId
  }

  get content() {
    return this.props.content
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }
}
