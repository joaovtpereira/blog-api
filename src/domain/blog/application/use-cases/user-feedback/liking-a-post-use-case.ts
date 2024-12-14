import { UniquieEntityId } from '@/core/entities/uniquie-entity-id'
import { UserFeedback } from '@/domain/blog/enterprise/entities/user-feedback'
import { PostsRepository } from '@/domain/blog/application/repositories/post-repository'
import { UserFeedbackRepository } from '@/domain/blog/application/repositories/user-likes-repository'
import { Either, left, right } from '@/core/either'
import { NotFoundError } from '../../../../../core/errors/not-found-error'
import { AlreadyLikePostError } from '../../../../../core/errors/already-like-post-error'

interface LikingPostUseCaseRequest {
  postId: string
  userId: string
}

type LikingPostUseCaseResponse = Either<
  NotFoundError | AlreadyLikePostError,
  NonNullable<unknown>
>

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
      return left(new NotFoundError())
    }

    const existsLike = await this.userFeedbackRepository.findHaveLikeByPost(
      postId,
      userId,
    )

    if (existsLike) {
      return left(new AlreadyLikePostError())
    }

    const like = UserFeedback.create({
      userId: new UniquieEntityId(userId),
      postId: new UniquieEntityId(postId),
      liked: true,
    })

    await this.userFeedbackRepository.create(like)

    return right({})
  }
}
