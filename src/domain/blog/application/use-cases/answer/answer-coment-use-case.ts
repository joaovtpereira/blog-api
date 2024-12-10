import { Answer } from '@/domain/blog/enterprise/entities/answer'
import { AnswerRepository } from '@/domain/blog/application/repositories/answer-repository'
import { UniquieEntityId } from '@/core/entities/uniquie-entity-id'
import { CommentRepository } from '../../repositories/comment-repository'
import { Either, left, right } from '@/core/either'
import { NotFoundError } from '../errors/not-found-error'

interface CreateAnswerUseCaseRequest {
  content: string
  authorId: string
  commentId: string
}

type CreateAnswerUseCaseResponse = Either<
  NotFoundError,
  {
    answer: Answer
  }
>

export class CreateAnswerUseCase {
  constructor(
    private answerRepository: AnswerRepository,
    private commentRepository: CommentRepository,
  ) {}

  async execute({
    content,
    authorId,
    commentId,
  }: CreateAnswerUseCaseRequest): Promise<CreateAnswerUseCaseResponse> {
    const comment = await this.commentRepository.findById(commentId)

    if (!comment) {
      return left(new NotFoundError())
    }

    const answer = Answer.create({
      content,
      authorId: new UniquieEntityId(authorId),
      commentId: new UniquieEntityId(commentId),
    })

    await this.answerRepository.create(answer)

    return right({ answer })
  }
}
