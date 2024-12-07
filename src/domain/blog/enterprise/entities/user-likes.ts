import { Entity } from '../../../../core/entities/entity'
import { Optional } from '../../../../core/types/optional'
import { UniquieEntityId } from '../../../../core/entities/uniquie-entity-id'

interface UserLikesProps {
  userId: UniquieEntityId
  postId: UniquieEntityId
  created_at: Date
}

export class UserLikes extends Entity<UserLikesProps> {
  get userId() {
    return this.props.userId
  }

  get postId() {
    return this.props.postId
  }

  static create(
    props: Optional<UserLikesProps, 'created_at'>,
    id?: UniquieEntityId,
  ) {
    const userLike = new UserLikes(
      {
        ...props,
        created_at: new Date(),
      },
      id,
    )

    return userLike
  }
}
