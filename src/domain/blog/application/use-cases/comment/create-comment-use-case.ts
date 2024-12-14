import { CommentRepository } from '@/domain/blog/application/repositories/comment-repository'
import { PostsRepository } from '@/domain/blog/application/repositories/post-repository'
import { UniquieEntityId } from '@/core/entities/uniquie-entity-id'
import { Either, left, right } from '@/core/either'
import { NotFoundError } from '../../../../../core/errors/not-found-error'
import { Comment } from '@/domain/blog/enterprise/entities/comment'

interface CreateCommentUseCaseRequest {
  content: string
  postId: string
  authorId: string
}

type CreateCommentUseCaseResponse = Either<
  NotFoundError,
  {
    comment: Comment
  }
>

export class CreateCommentUseCase {
  constructor(
    private commentRepository: CommentRepository,
    private postRepository: PostsRepository,
  ) {}

  async execute({
    postId,
    content,
    authorId,
  }: CreateCommentUseCaseRequest): Promise<CreateCommentUseCaseResponse> {
    const post = await this.postRepository.findById(postId)

    if (!post) {
      return left(new NotFoundError())
    }

    const comment = Comment.create({
      content,
      postId: new UniquieEntityId(postId),
      authorId: new UniquieEntityId(authorId),
    })

    await this.commentRepository.create(comment)

    return right({ comment })
  }
}
