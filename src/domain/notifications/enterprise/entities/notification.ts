import { Entity } from '@/core/entities/entity'
import { UniquieEntityId } from '@/core/entities/uniquie-entity-id'
import { Optional } from '@/core/types/optional'

export interface NotificationProps {
  content: string
  title: string
  recipientId: string
  createdAt: Date
  readAt?: Date
}

export class Notification extends Entity<NotificationProps> {
  get content() {
    return this.props.content
  }

  get title() {
    return this.props.title
  }

  get recipientId() {
    return this.props.recipientId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get readAt() {
    return this.props.readAt
  }

  read() {
    this.props.readAt = new Date()
  }

  static create(
    props: Optional<NotificationProps, 'createdAt'>,
    id?: UniquieEntityId,
  ) {
    const notification = new Notification(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return notification
  }
}
