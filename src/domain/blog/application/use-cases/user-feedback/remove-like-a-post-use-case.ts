import { PostsRepository } from '@/domain/blog/application/repositories/post-repository'
import { UserFeedbackRepository } from '@/domain/blog/application/repositories/user-likes-repository'

interface RemoveLikePosttUseCaseRequest {
  postId: string
  userId: string
}

interface RemoveLikePosttUseCaseResponse {}

export class RemoveLikePosttUseCase {
  constructor(
    private userFeedbackRepository: UserFeedbackRepository,
    private postRepository: PostsRepository,
  ) {}

  async execute({
    postId,
    userId,
  }: RemoveLikePosttUseCaseRequest): Promise<RemoveLikePosttUseCaseResponse> {
    const post = await this.postRepository.findById(postId)

    if (!post) {
      throw new Error('Post not found')
    }

    const userLike = await this.userFeedbackRepository.findHaveLikeByPost(
      postId,
      userId,
    )

    if (!userLike) {
      throw new Error('You doent like this post')
    }

    await this.userFeedbackRepository.delete(userLike)

    return {}
  }
}
