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
    const user = await sut.execute({
      name: 'João',
      email: '4kH2Y@example.com',
      password: '123456',
    })

    expect(inMemoryUserRepository.items[0].id).toEqual(user.id)
  })
})
