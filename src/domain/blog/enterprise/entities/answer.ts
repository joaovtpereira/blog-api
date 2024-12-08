import { UniquieEntityId } from '../../../../core/entities/uniquie-entity-id'
import { Optional } from '../../../../core/types/optional'
import { Entity } from '../../../../core/entities/entity'

interface AnswerProps {
  content: string
  authorId: UniquieEntityId
  commentId: UniquieEntityId
  created_at: Date
}

export class Answer extends Entity<AnswerProps> {
  get content() {
    return this.props.content
  }

  get authorId() {
    return this.props.authorId
  }

  get commentId() {
    return this.props.commentId
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
