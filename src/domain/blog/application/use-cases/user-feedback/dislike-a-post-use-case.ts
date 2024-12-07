import { UniquieEntityId } from '@/core/entities/uniquie-entity-id'
import { UserFeedback } from '@/domain/blog/enterprise/entities/user-feedback'
import { PostsRepository } from '@/domain/blog/application/repositories/post-repository'
import { UserFeedbackRepository } from '@/domain/blog/application/repositories/user-likes-repository'

interface DislikePosttUseCaseRequest {
  postId: string
  userId: string
}

interface DislikePosttUseCaseResponse {}

export class DislikePosttUseCase {
  constructor(
    private userFeedbackRepository: UserFeedbackRepository,
    private postRepository: PostsRepository,
  ) {}

  async execute({
    postId,
    userId,
  }: DislikePosttUseCaseRequest): Promise<DislikePosttUseCaseResponse> {
    const post = await this.postRepository.findById(postId)

    if (!post) {
      throw new Error('Post not found')
    }

    const existsDisliked =
      await this.userFeedbackRepository.findHaveDislikedAPost(postId, userId)

    if (existsDisliked) {
      throw new Error('You already disliked this post')
    }

    const like = UserFeedback.create({
      userId: new UniquieEntityId(userId),
      postId: new UniquieEntityId(postId),
      liked: false,
    })

    await this.userFeedbackRepository.create(like)

    return {}
  }
}
