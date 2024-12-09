import { UniquieEntityId } from '@/core/entities/uniquie-entity-id'
import { Answer, AnswerProps } from '@/domain/blog/enterprise/entities/answer'
import { faker } from '@faker-js/faker'

export function makeAnswer(
  override: Partial<AnswerProps> = {},
  id?: UniquieEntityId,
) {
  const answer = Answer.create(
    {
      authorId: new UniquieEntityId(),
      content: faker.lorem.text(),
      commentId: new UniquieEntityId(),
      ...override,
    },
    id,
  )

  return answer
}
