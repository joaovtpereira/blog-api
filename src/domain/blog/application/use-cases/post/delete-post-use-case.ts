import { Either, left, right } from '@/core/either'
import { PostsRepository } from '@/domain/blog/application/repositories/post-repository'
import { NotFoundError } from '../../../../../core/errors/not-found-error'
import { NotAllowedError } from '../../../../../core/errors/not-allowed-error'

interface DeletePostUseCaseRequest {
  authorId: string
  postId: string
}

type DeletePostUseCaseResponse = Either<
  NotFoundError | NotAllowedError,
  NonNullable<unknown>
>

export class DeletePostUseCase {
  constructor(private postRepository: PostsRepository) {}
  async execute({
    authorId,
    postId,
  }: DeletePostUseCaseRequest): Promise<DeletePostUseCaseResponse> {
    const post = await this.postRepository.findById(postId)

    if (!post) {
      return left(new NotFoundError())
    }

    if (post.authorId.toValue() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.postRepository.delete(post)

    return right({})
  }
}
