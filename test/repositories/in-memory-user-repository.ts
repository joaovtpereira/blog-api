import { UserRepository } from '@/domain/blog/application/repositories/user-repository'
import { User } from '@/domain/blog/enterprise/entities/user'
export class InMemoryUserRepository implements UserRepository {
  public items: User[] = []
  async create(user: User) {
    this.items.push(user)
    return user
  }
}
