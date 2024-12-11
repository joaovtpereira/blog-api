import { UniquieEntityId } from '@/core/entities/uniquie-entity-id'
import {
  ResponseAnswer,
  ResponseAnswerProps,
} from '@/domain/blog/enterprise/entities/response-answer'
import { faker } from '@faker-js/faker'

export function makeResponseAnswer(
  override: Partial<ResponseAnswerProps> = {},
  id?: UniquieEntityId,
) {
  const responseAnswer = ResponseAnswer.create(
    {
      authorId: new UniquieEntityId(),
      content: faker.lorem.text(),
      answerId: new UniquieEntityId(),
      ...override,
    },
    id,
  )

  return responseAnswer
}
