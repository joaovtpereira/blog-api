import { Answer } from '@/domain/blog/enterprise/entities/answer'
import { AnswerRepository } from '@/domain/blog/application/repositories/answer-repository'
import { UniquieEntityId } from '@/core/entities/uniquie-entity-id'
import { CommentRepository } from '../../repositories/comment-repository'

interface CreateAnswerUseCaseRequest {
  content: string
  authorId: string
  commentId: string
}

export class CreateAnswerUseCase {
  constructor(
    private answerRepository: AnswerRepository,
    private commentRepository: CommentRepository,
  ) {}

  async execute({ content, authorId, commentId }: CreateAnswerUseCaseRequest) {
    const comment = await this.commentRepository.findById(commentId)

    if (!comment) {
      throw new Error('Comment not found')
    }

    const answer = Answer.create({
      content,
      authorId: new UniquieEntityId(authorId),
      commentId: new UniquieEntityId(commentId),
    })

    await this.answerRepository.create(answer)

    return answer
  }
}
