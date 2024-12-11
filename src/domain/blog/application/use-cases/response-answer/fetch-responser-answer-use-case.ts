import { ResponseAnswerRepository } from '@/domain/blog/application/repositories/response-answer-repository'
import { Either, right } from '@/core/either'
import { ResponseAnswer } from '@/domain/blog/enterprise/entities/response-answer'

interface FetchResponseAnswerByResponseAnswerUseCaseRequest {
  answerId: string
  page: number
}

type FetchResponseAnswerByResponseAnswerUseCaseResponse = Either<
  null,
  {
    responseAnswers: ResponseAnswer[]
  }
>

export class FetchResponseAnswerByResponseAnswerUseCase {
  constructor(private responseAnswerRepository: ResponseAnswerRepository) {}

  async execute({
    answerId,
    page,
  }: FetchResponseAnswerByResponseAnswerUseCaseRequest): Promise<FetchResponseAnswerByResponseAnswerUseCaseResponse> {
    const responseAnswers =
      await this.responseAnswerRepository.findManyByAnswerId(answerId, {
        page,
      })

    return right({ responseAnswers })
  }
}
