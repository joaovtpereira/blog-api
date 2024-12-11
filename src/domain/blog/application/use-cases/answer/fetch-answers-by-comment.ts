import { AnswerRepository } from '@/domain/blog/application/repositories/answer-repository'
import { Either, right } from '@/core/either'
import { Answer } from '@/domain/blog/enterprise/entities/answer'

interface FetchAnswerByCommentUseCaseRequest {
  commentId: string
  page: number
}

type FetchAnswerByCommentUseCaseResponse = Either<
  null,
  {
    answers: Answer[]
  }
>

export class FetchAnswerByCommentUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    commentId,
    page,
  }: FetchAnswerByCommentUseCaseRequest): Promise<FetchAnswerByCommentUseCaseResponse> {
    const answers = await this.answerRepository.findManyByCommentId(commentId, {
      page,
    })

    return right({ answers })
  }
}
