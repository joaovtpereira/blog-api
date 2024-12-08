import { AnswerRepository } from '@/domain/blog/application/repositories/answer-repository'
import { Answer } from '@/domain/blog/enterprise/entities/answer'
export class InMemoryAnswerRepository implements AnswerRepository {
  public items: Answer[] = []

  async findById(id: string) {
    const answer = this.items.find((item) => item.id.toValue() === id)

    if (!answer) {
      return null
    }

    return answer
  }

  async create(answer: Answer) {
    this.items.push(answer)
    return answer
  }

  async save(answer: Answer) {
    const answerIndex = this.items.findIndex(
      (item) => item.id.toValue() === answer.id.toValue(),
    )

    this.items[answerIndex] = answer
  }
}
