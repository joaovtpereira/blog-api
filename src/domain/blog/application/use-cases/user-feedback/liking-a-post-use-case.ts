import { UniquieEntityId } from '@/core/entities/uniquie-entity-id'
import { UserFeedback } from '@/domain/blog/enterprise/entities/user-feedback'
import { PostsRepository } from '@/domain/blog/application/repositories/post-repository'
import { UserFeedbackRepository } from '@/domain/blog/application/repositories/user-likes-repository'

interface LikingPostUseCaseRequest {
  postId: string
  userId: string
}

interface LikingPostUseCaseResponse {}

export class LikingPostUseCase {
  constructor(
    private userFeedbackRepository: UserFeedbackRepository,
    private postRepository: PostsRepository,
  ) {}

  async execute({
    postId,
    userId,
  }: LikingPostUseCaseRequest): Promise<LikingPostUseCaseResponse> {
    const post = await this.postRepository.findById(postId)

    if (!post) {
      throw new Error('Post not found')
    }

    const existsLike = await this.userFeedbackRepository.findHaveLikeByPost(
      postId,
      userId,
    )

    if (existsLike) {
      throw new Error('You already liked this post')
    }

    const like = UserFeedback.create({
      userId: new UniquieEntityId(userId),
      postId: new UniquieEntityId(postId),
      liked: true,
    })

    await this.userFeedbackRepository.create(like)

    return {}
  }
}
