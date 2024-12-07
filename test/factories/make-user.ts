import { UniquieEntityId } from '@/core/entities/uniquie-entity-id'
import { User, UserProps } from '@/domain/blog/enterprise/entities/user'
import { faker } from '@faker-js/faker'

export function makeUser(
  override: Partial<UserProps> = {},
  id?: UniquieEntityId,
) {
  const user = User.create(
    {
      name: faker.internet.username(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return user
}
