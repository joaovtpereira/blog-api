import { User } from '@/domain/blog/enterprise/entities/user'

export interface UserRepository {
  create(user: User): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  delete(user: User): Promise<User>
}
