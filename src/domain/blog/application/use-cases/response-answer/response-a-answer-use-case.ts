import { ResponseAnswer } from '@/domain/blog/enterprise/entities/response-answer'
import { ResponseAnswerRepository } from '@/domain/blog/application/repositories/response-answer-repository'
import { UniquieEntityId } from '@/core/entities/uniquie-entity-id'
import { AnswerRepository } from '@/domain/blog/application/repositories/answer-repository'
import { Either, left, right } from '@/core/either'
import { NotFoundError } from '../../../../../core/errors/not-found-error'

interface ResponseAnswerUseCaseRequest {
  content: string
  authorId: string
  answerId: string
}

type ResponseAnswerUseCaseResponse = Either<
  NotFoundError,
  {
    responseAnswer: ResponseAnswer
  }
>

export class ResponseAnswerUseCase {
  constructor(
    private answerRepository: AnswerRepository,
    private responseAnswerRepository: ResponseAnswerRepository,
  ) {}

  async execute({
    content,
    authorId,
    answerId,
  }: ResponseAnswerUseCaseRequest): Promise<ResponseAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new NotFoundError())
    }

    const responseAnswer = ResponseAnswer.create({
      content,
      authorId: new UniquieEntityId(authorId),
      answerId: new UniquieEntityId(answerId),
    })

    await this.responseAnswerRepository.create(responseAnswer)

    return right({ responseAnswer })
  }
}
