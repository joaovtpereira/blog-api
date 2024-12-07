import { UserRepository } from '@/domain/blog/application/repositories/user-repository'

interface DeleteUserUseCaseRequest {
  id: string
}

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute(props: DeleteUserUseCaseRequest) {
    const user = await this.userRepository.findById(props.id)

    console.log({ user })

    if (!user) {
      throw new Error('User doenst exists')
    }

    await this.userRepository.delete(user)

    return user
  }
}
