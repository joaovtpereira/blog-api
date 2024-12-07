import { User } from '@/domain/blog/enterprise/entities/user'

export interface UserRepository {
  create(user: User): Promise<User>
}
