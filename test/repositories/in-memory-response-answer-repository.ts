import { ResponseAnswerRepository } from '@/domain/blog/application/repositories/response-answer-repository'
import { ResponseAnswer } from '@/domain/blog/enterprise/entities/response-answer'
export class InMemoryResponseAnswerRepository
  implements ResponseAnswerRepository
{
  public items: ResponseAnswer[] = []

  async findById(id: string) {
    const responseAnswer = this.items.find((item) => item.id.toValue() === id)

    if (!responseAnswer) {
      return null
    }

    return responseAnswer
  }

  async create(responseAnswer: ResponseAnswer) {
    this.items.push(responseAnswer)
    return responseAnswer
  }

  async save(responseAnswer: ResponseAnswer) {
    const responseAnswerIndex = this.items.findIndex(
      (item) => item.id.toValue() === responseAnswer.id.toValue(),
    )

    this.items[responseAnswerIndex] = responseAnswer
  }
}
