import { UserLikesRepository } from '@/domain/blog/application/repositories/user-likes-repository'
import { UserLikes } from '@/domain/blog/enterprise/entities/user-likes'
export class InMemoryUserLikesRepository implements UserLikesRepository {
  public items: UserLikes[] = []
  async create(userLike: UserLikes) {
    this.items.push(userLike)
    return userLike
  }

  async findHaveLikeByPost(postId: string, userId: string) {
    const userlike = this.items.find(
      (item) =>
        item.postId.toValue() === postId && item.userId.toValue() === userId,
    )

    if (!userlike) {
      return null
    }

    return userlike
  }

  async delete(userLike: UserLikes) {
    const likeIndex = this.items.findIndex((item) => item?.id === userLike.id)

    this.items.splice(likeIndex, 1)
  }
}
