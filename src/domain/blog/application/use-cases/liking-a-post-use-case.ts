import { UniquieEntityId } from '@/core/entities/uniquie-entity-id'
import { UserFeedback } from '../../enterprise/entities/user-feedback'
import { PostsRepository } from '../repositories/post-repository'
import { UserFeedbackRepository } from '../repositories/user-likes-repository'

interface LikingPostUseCaseRequest {
  postId: string
  userId: string
}

interface LikingPostUseCaseResponse {}

export class LikingPostUseCase {
  constructor(
    private userLikeRepository: UserFeedbackRepository,
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

    const existsLike = await this.userLikeRepository.findHaveLikeByPost(
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

    await this.userLikeRepository.create(like)

    return {}
  }
}
