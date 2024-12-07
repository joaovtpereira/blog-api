import { PostsRepository } from '../repositories/post-repository'
import { UserFeedbackRepository } from '../repositories/user-likes-repository'

interface RemoveLikePosttUseCaseRequest {
  postId: string
  userId: string
}

interface RemoveLikePosttUseCaseResponse {}

export class RemoveLikePosttUseCase {
  constructor(
    private userLikeRepository: UserFeedbackRepository,
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

    const userLike = await this.userLikeRepository.findHaveLikeByPost(
      postId,
      userId,
    )

    if (!userLike) {
      throw new Error('You doent like this post')
    }

    await this.userLikeRepository.delete(userLike)

    return {}
  }
}
