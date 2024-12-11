import { Either, left, right } from '@/core/either'
import { PostsRepository } from '@/domain/blog/application/repositories/post-repository'
import { Post } from '@/domain/blog/enterprise/entities/post'
import { NotFoundError } from '../errors/not-found-error'
import { NotAllowedError } from '../errors/not-allowed-error'

interface EditPostUseCaseRequest {
  postId: string
  content: string
  authorId: string
}

type EditPostUseCaseResponse = Either<
  NotFoundError | NotAllowedError,
  {
    post: Post
  }
>

export class EditPostUseCase {
  constructor(private postRepository: PostsRepository) {}

  async execute(
    props: EditPostUseCaseRequest,
  ): Promise<EditPostUseCaseResponse> {
    const post = await this.postRepository.findById(props.postId)

    if (!post) {
      return left(new NotFoundError())
    }

    if (post.authorId.toValue() !== props.authorId) {
      return left(new NotAllowedError())
    }

    post.content = props.content

    await this.postRepository.save(post)

    return right({ post })
  }
}
