import { User } from '@/domain/blog/enterprise/entities/user'
import { UserRepository } from '@/domain/blog/application/repositories/user-repository'
import { Either, left, right } from '@/core/either'
import { UserWithSameEmail } from '../../../../../core/errors/user-with-same-email-error'

interface CreateUserUseCaseRequest {
  name: string
  email: string
  password: string
}

type CreateUserUseCaseResponse = Either<
  UserWithSameEmail,
  {
    user: User
  }
>

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute(
    props: CreateUserUseCaseRequest,
  ): Promise<CreateUserUseCaseResponse> {
    const userAlreadyExistsWithSameEmail =
      await this.userRepository.findByEmail(props.email)

    if (userAlreadyExistsWithSameEmail) {
      return left(new UserWithSameEmail())
    }

    const user = User.create({
      ...props,
    })

    await this.userRepository.create(user)

    return right({ user })
  }
}
