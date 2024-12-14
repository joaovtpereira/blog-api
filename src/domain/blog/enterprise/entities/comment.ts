import { Optional } from '../../../../core/types/optional'
import { UniquieEntityId } from '../../../../core/entities/uniquie-entity-id'
import { AgregateRoot } from '@/core/entities/aggregate-root'
import { OnCommentCreatedEvent } from '../../application/events/on-comment-post-event'

export interface CommentProps {
  content: string
  postId: UniquieEntityId
  authorId: UniquieEntityId
  created_at: Date
}

export class Comment extends AgregateRoot<CommentProps> {
  get postId() {
    return this.props.postId
  }

  get authorId() {
    return this.props.authorId
  }

  get content() {
    return this.props.content
  }

  get created_at() {
    return this.props.created_at
  }

  set content(content: string) {
    this.props.content = content
  }

  static create(
    props: Optional<CommentProps, 'created_at'>,
    id?: UniquieEntityId,
  ) {
    const coment = new Comment(
      {
        ...props,
        created_at: new Date(),
      },
      id,
    )

    const isNewComent = !id

    if (isNewComent) {
      coment.addDomainEvent(new OnCommentCreatedEvent(coment))
    }

    return coment
  }
}
