import { Either, left, right } from '@/core/either'
import { CommentRepository } from '@/domain/blog/application/repositories/comment-repository'
import { NotFoundError } from '../../../../../core/errors/not-found-error'
import { NotAllowedError } from '../../../../../core/errors/not-allowed-error'
import { Comment } from '@/domain/blog/enterprise/entities/comment'

interface EditCommentUseCaseRequest {
  content: string
  commentId: string
  authorId: string
}

type EditCommentUseCaseResponse = Either<
  NotFoundError | NotAllowedError,
  {
    comment: Comment
  }
>

export class EditCommentUseCase {
  constructor(private commentRepository: CommentRepository) {}

  async execute({
    commentId,
    content,
    authorId,
  }: EditCommentUseCaseRequest): Promise<EditCommentUseCaseResponse> {
    const comment = await this.commentRepository.findById(commentId)

    if (!comment) {
      return left(new NotFoundError())
    }

    if (comment.authorId.toValue() !== authorId) {
      return left(new NotAllowedError())
    }

    comment.content = content

    await this.commentRepository.save(comment)

    return right({ comment })
  }
}
