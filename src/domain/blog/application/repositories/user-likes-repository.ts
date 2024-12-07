import { UserFeedback } from '@/domain/blog/enterprise/entities/user-feedback'

export interface UserFeedbackRepository {
  create(userfeedback: UserFeedback): Promise<UserFeedback>
  findHaveLikeByPost(
    postId: string,
    userId: string,
  ): Promise<UserFeedback | null>
  delete(userLike: UserFeedback): Promise<void>
}
