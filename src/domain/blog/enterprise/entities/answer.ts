import { UniquieEntityId } from '../../../../core/entities/uniquie-entity-id'
import { Optional } from '../../../../core/types/optional'
import { Entity } from '../../../../core/entities/entity'

interface AnswerProps {
  content: string
  post_id: string
  authorId: string
  comment_id: string
  created_at: Date
}

export class Answer extends Entity<AnswerProps> {
  get content() {
    return this.props.content
  }

  get post_id() {
    return this.props.post_id
  }

  get authorId() {
    return this.props.authorId
  }

  get comment_id() {
    return this.props.comment_id
  }

  get created_at() {
    return this.props.created_at
  }

  set content(content: string) {
    this.props.content = content
  }

  static create(
    props: Optional<AnswerProps, 'created_at'>,
    id?: UniquieEntityId,
  ) {
    const answer = new Answer(
      {
        ...props,
        created_at: new Date(),
      },
      id,
    )

    return answer
  }
}
