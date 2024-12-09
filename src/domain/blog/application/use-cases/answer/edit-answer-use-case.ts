import { AnswerRepository } from '@/domain/blog/application/repositories/answer-repository'

interface EditAnswerUseCaseRequest {
  content: string
  answerId: string
  authorId: string
}

export class EditAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({ answerId, content, authorId }: EditAnswerUseCaseRequest) {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    if (answer.authorId.toValue() !== authorId) {
      throw new Error('You are not the author of this answer')
    }

    answer.content = content

    await this.answerRepository.save(answer)

    return answer
  }
}
