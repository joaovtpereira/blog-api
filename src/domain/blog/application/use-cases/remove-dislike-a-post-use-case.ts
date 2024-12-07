import { PostsRepository } from '../repositories/post-repository'
import { UserFeedbackRepository } from '../repositories/user-likes-repository'

interface RemoveDislikedPosttUseCaseRequest {
  postId: string
  userId: string
}

interface RemoveDislikedPosttUseCaseResponse {}

export class RemoveDislikedPosttUseCase {
  constructor(
    private userFeedbackRepository: UserFeedbackRepository,
    private postRepository: PostsRepository,
  ) {}

  async execute({
    postId,
    userId,
  }: RemoveDislikedPosttUseCaseRequest): Promise<RemoveDislikedPosttUseCaseResponse> {
    const post = await this.postRepository.findById(postId)

    if (!post) {
      throw new Error('Post not found')
    }

    const userDislike = await this.userFeedbackRepository.findHaveDislikedAPost(
      postId,
      userId,
    )

    if (!userDislike) {
      throw new Error('You doent dislike this post')
    }

    await this.userFeedbackRepository.delete(userDislike)

    return {}
  }
}
