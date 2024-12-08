import { CommentRepository } from '@/domain/blog/application/repositories/comment-repository'

interface EditCommentUseCaseRequest {
  content: string
  commentId: string
  authorId: string
}

export class EditCommentUseCase {
  constructor(private commentRepository: CommentRepository) {}

  async execute({ commentId, content, authorId }: EditCommentUseCaseRequest) {
    const comment = await this.commentRepository.findById(commentId)

    if (!comment) {
      throw new Error('Comment not found')
    }

    if (comment.authorId.toValue() !== authorId) {
      throw new Error('You are not the author of this comment')
    }

    comment.content = content

    await this.commentRepository.save(comment)

    return comment
  }
}
