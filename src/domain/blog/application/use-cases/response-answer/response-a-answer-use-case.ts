import { ResponseAnswer } from '@/domain/blog/enterprise/entities/response-answer'
import { ResponseAnswerRepository } from '@/domain/blog/application/repositories/response-answer-repository'
import { UniquieEntityId } from '@/core/entities/uniquie-entity-id'
import { AnswerRepository } from '../../repositories/answer-repository'

interface ResponseAnswerUseCaseRequest {
  content: string
  authorId: string
  answerId: string
}

export class ResponseAnswerUseCase {
  constructor(
    private answerRepository: AnswerRepository,
    private responseAnswerRepository: ResponseAnswerRepository,
  ) {}

  async execute({ content, authorId, answerId }: ResponseAnswerUseCaseRequest) {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    const responseAnswer = ResponseAnswer.create({
      content,
      authorId: new UniquieEntityId(authorId),
      answerId: new UniquieEntityId(answerId),
    })

    await this.responseAnswerRepository.create(responseAnswer)

    return responseAnswer
  }
}
