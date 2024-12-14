import { UserWithSameEmail } from '../../../../../core/errors/user-with-same-email-error'
import { CreateUserUseCase } from './create-user-use-case'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'

let inMemoryUserRepository: InMemoryUserRepository
let sut: CreateUserUseCase

describe('Create User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new CreateUserUseCase(inMemoryUserRepository)
  })

  it('should be possible create a user', async () => {
    const result = await sut.execute({
      name: 'João',
      email: '4kH2Y@example.com',
      password: '123456',
    })

    assert(result.isRight(), 'Result not success')
    expect(inMemoryUserRepository.items[0].id).toEqual(result.value.user.id)
  })

  it('not be should possible create a user with email already exists', async () => {
    await sut.execute({
      email: '4kH2Y@example.com',
      name: 'Lucas',
      password: '123456',
    })

    const result = await sut.execute({
      email: '4kH2Y@example.com',
      name: 'Joao',
      password: '123456',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UserWithSameEmail)
  })
})
