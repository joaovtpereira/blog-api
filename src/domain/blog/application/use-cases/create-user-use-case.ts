import { User } from '@/domain/blog/enterprise/entities/user'
import { UserRepository } from '@/domain/blog/application/repositories/user-repository'

interface CreateUserUseCaseRequest {
  name: string
  email: string
  password: string
}

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute(props: CreateUserUseCaseRequest) {
    const userAlreadyExistsWithSameEmail =
      await this.userRepository.findByEmail(props.email)

    if (userAlreadyExistsWithSameEmail) {
      throw new Error('User already exists with same email')
    }

    const user = User.create({
      ...props,
    })

    await this.userRepository.create(user)

    return user
  }
}
