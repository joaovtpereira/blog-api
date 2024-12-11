import { Either, left, right } from '@/core/either'
import { UserRepository } from '@/domain/blog/application/repositories/user-repository'
import { NotFoundError } from '../errors/not-found-error'
import { User } from '@/domain/blog/enterprise/entities/user'

interface DeleteUserUseCaseRequest {
  id: string
}

type DeleteUserUseCaseResponse = Either<
  NotFoundError,
  {
    user: User
  }
>

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute(
    props: DeleteUserUseCaseRequest,
  ): Promise<DeleteUserUseCaseResponse> {
    const user = await this.userRepository.findById(props.id)

    if (!user) {
      return left(new NotFoundError())
    }

    await this.userRepository.delete(user)

    return right({ user })
  }
}
