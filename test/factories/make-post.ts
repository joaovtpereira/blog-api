import { UniquieEntityId } from '@/core/entities/uniquie-entity-id'
import { Post, PostProps } from '@/domain/blog/enterprise/entities/post'
import { faker } from '@faker-js/faker'

export function makePost(
  override: Partial<PostProps> = {},
  id?: UniquieEntityId,
) {
  const post = Post.create(
    {
      authorId: new UniquieEntityId(),
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      category: faker.lorem.word(),
      ...override,
    },
    id,
  )

  return post
}
