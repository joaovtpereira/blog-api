import { Either, left, right } from '@/core/either'
import { PostsRepository } from '@/domain/blog/application/repositories/post-repository'
import { UserFeedbackRepository } from '@/domain/blog/application/repositories/user-likes-repository'
import { NotLikedPostError } from '../errors/not-liked-post-error'
import { NotFoundError } from '../errors/not-found-error'

interface RemoveLikePosttUseCaseRequest {
  postId: string
  userId: string
}

type RemoveLikePosttUseCaseResponse = Either<
  NotFoundError | NotLikedPostError,
  NonNullable<unknown>
>

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
      return left(new NotFoundError())
    }

    const userLike = await this.userFeedbackRepository.findHaveLikeByPost(
      postId,
      userId,
    )

    if (!userLike) {
      return left(new NotLikedPostError())
    }

    await this.userFeedbackRepository.delete(userLike)

    return right({})
  }
}
