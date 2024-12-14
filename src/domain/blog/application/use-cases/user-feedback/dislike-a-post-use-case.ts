import { UniquieEntityId } from '@/core/entities/uniquie-entity-id'
import { UserFeedback } from '@/domain/blog/enterprise/entities/user-feedback'
import { PostsRepository } from '@/domain/blog/application/repositories/post-repository'
import { UserFeedbackRepository } from '@/domain/blog/application/repositories/user-likes-repository'
import { Either, left, right } from '@/core/either'
import { NotFoundError } from '../../../../../core/errors/not-found-error'
import { AlreadyDislikePostError } from '../../../../../core/errors/already-dislike-post-error'

interface DislikePosttUseCaseRequest {
  postId: string
  userId: string
}

type DislikePosttUseCaseResponse = Either<
  NotFoundError | AlreadyDislikePostError,
  NonNullable<unknown>
>

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
      return left(new NotFoundError())
    }

    const existsDisliked =
      await this.userFeedbackRepository.findHaveDislikedAPost(postId, userId)

    if (existsDisliked) {
      return left(new AlreadyDislikePostError())
    }

    const like = UserFeedback.create({
      userId: new UniquieEntityId(userId),
      postId: new UniquieEntityId(postId),
      liked: false,
    })

    await this.userFeedbackRepository.create(like)

    return right({})
  }
}
