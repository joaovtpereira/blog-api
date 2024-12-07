import { UniquieEntityId } from '@/core/entities/uniquie-entity-id'
import { UserLikes } from '../../enterprise/entities/user-likes'
import { PostsRepository } from '../repositories/post-repository'
import { UserLikesRepository } from '../repositories/user-likes-repository'

interface LikingPostUseCaseRequest {
  postId: string
  userId: string
}

interface LikingPostUseCaseResponse {}

export class LikingPostUseCase {
  constructor(
    private userLikeRepository: UserLikesRepository,
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

    const like = UserLikes.create({
      userId: new UniquieEntityId(userId),
      postId: new UniquieEntityId(postId),
    })

    await this.userLikeRepository.create(like)

    return {}
  }
}
