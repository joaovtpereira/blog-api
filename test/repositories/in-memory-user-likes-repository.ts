import { UserFeedbackRepository } from '@/domain/blog/application/repositories/user-likes-repository'
import { UserFeedback } from '@/domain/blog/enterprise/entities/user-feedback'
export class InMemoryUserLikesRepository implements UserFeedbackRepository {
  public items: UserFeedback[] = []
  async create(userLike: UserFeedback) {
    this.items.push(userLike)
    return userLike
  }

  async findHaveLikeByPost(postId: string, userId: string) {
    const userlike = this.items.find(
      (item) =>
        item.postId.toValue() === postId &&
        item.userId.toValue() === userId &&
        item.liked,
    )

    if (!userlike) {
      return null
    }

    return userlike
  }

  async delete(userLike: UserFeedback) {
    const likeIndex = this.items.findIndex((item) => item?.id === userLike.id)

    this.items.splice(likeIndex, 1)
  }
}
