import { AnswerRepository } from '@/domain/blog/application/repositories/answer-repository'
import { NotAllowedError } from '../errors/not-allowed-error'
import { NotFoundError } from '../errors/not-found-error'
import { Either, left, right } from '@/core/either'
import { Answer } from '@/domain/blog/enterprise/entities/answer'

interface EditAnswerUseCaseRequest {
  content: string
  answerId: string
  authorId: string
}

type CreateAnswerUseCaseResponse = Either<
  NotFoundError | NotAllowedError,
  {
    answer: Answer
  }
>

export class EditAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    answerId,
    content,
    authorId,
  }: EditAnswerUseCaseRequest): Promise<CreateAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new NotFoundError())
    }

    if (answer.authorId.toValue() !== authorId) {
      return left(new NotAllowedError())
    }

    answer.content = content

    await this.answerRepository.save(answer)

    return right({ answer })
  }
}
