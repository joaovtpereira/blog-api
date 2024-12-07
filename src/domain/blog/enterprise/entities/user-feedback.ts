import { Entity } from '../../../../core/entities/entity'
import { Optional } from '../../../../core/types/optional'
import { UniquieEntityId } from '../../../../core/entities/uniquie-entity-id'

interface UserFeedbackProps {
  userId: UniquieEntityId
  postId: UniquieEntityId
  liked: boolean | null
  created_at: Date
}

export class UserFeedback extends Entity<UserFeedbackProps> {
  get userId() {
    return this.props.userId
  }

  get postId() {
    return this.props.postId
  }

  get liked() {
    return this.props.liked
  }

  static create(
    props: Optional<UserFeedbackProps, 'created_at'>,
    id?: UniquieEntityId,
  ) {
    const userLike = new UserFeedback(
      {
        ...props,
        created_at: new Date(),
      },
      id,
    )

    return userLike
  }
}
