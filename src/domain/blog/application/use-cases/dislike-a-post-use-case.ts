import { UniquieEntityId } from '@/core/entities/uniquie-entity-id'
import { UserFeedback } from '../../enterprise/entities/user-feedback'
import { PostsRepository } from '../repositories/post-repository'
import { UserFeedbackRepository } from '../repositories/user-likes-repository'

interface DislikePosttUseCaseRequest {
  postId: string
  userId: string
}

interface DislikePosttUseCaseResponse {}

export class DislikePosttUseCase {
  constructor(
    private userLikeRepository: UserFeedbackRepository,
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

    const existsDisliked = await this.userLikeRepository.findHaveDislikedAPost(
      postId,
      userId,
    )

    if (existsDisliked) {
      throw new Error('You already disliked this post')
    }

    const like = UserFeedback.create({
      userId: new UniquieEntityId(userId),
      postId: new UniquieEntityId(postId),
      liked: false,
    })

    await this.userLikeRepository.create(like)

    return {}
  }
}
