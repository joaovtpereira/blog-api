import { UserLikes } from '@/domain/blog/enterprise/entities/user-likes'

export interface UserLikesRepository {
  create(userlikes: UserLikes): Promise<UserLikes>
  findHaveLikeByPost(postId: string, userId: string): Promise<UserLikes | null>
  delete(userLike: UserLikes): Promise<void>
}
