import { Either, left, right } from '@/core/either'
import { PostsRepository } from '@/domain/blog/application/repositories/post-repository'
import { UserFeedbackRepository } from '@/domain/blog/application/repositories/user-likes-repository'
import { NotFoundError } from '../errors/not-found-error'
import { NotDislikedPostError } from '../errors/not-disliked-post-error'

interface RemoveDislikedPostUseCaseRequest {
  postId: string
  userId: string
}

type RemoveDislikedPostUseCaseResponse = Either<
  NotFoundError | NotDislikedPostError,
  NonNullable<unknown>
>

export class RemoveDislikedPosttUseCase {
  constructor(
    private userFeedbackRepository: UserFeedbackRepository,
    private postRepository: PostsRepository,
  ) {}

  async execute({
    postId,
    userId,
  }: RemoveDislikedPostUseCaseRequest): Promise<RemoveDislikedPostUseCaseResponse> {
    const post = await this.postRepository.findById(postId)

    if (!post) {
      return left(new NotFoundError())
    }

    const userDislike = await this.userFeedbackRepository.findHaveDislikedAPost(
      postId,
      userId,
    )

    if (!userDislike) {
      return left(new NotDislikedPostError())
    }

    await this.userFeedbackRepository.delete(userDislike)

    return right({})
  }
}
