import { UniquieEntityId } from '@/core/entities/uniquie-entity-id'
import {
  Comment,
  CommentProps,
} from '@/domain/blog/enterprise/entities/comment'
import { faker } from '@faker-js/faker'

export function makeComment(
  override: Partial<CommentProps> = {},
  id?: UniquieEntityId,
) {
  const comment = Comment.create(
    {
      authorId: new UniquieEntityId(),
      postId: new UniquieEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return comment
}
