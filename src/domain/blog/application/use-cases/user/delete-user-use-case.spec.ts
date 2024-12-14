import { makeUser } from 'test/factories/make-user'
import { DeleteUserUseCase } from './delete-user-use-case'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { UniquieEntityId } from '@/core/entities/uniquie-entity-id'
import { NotFoundError } from '../../../../../core/errors/not-found-error'

let inMemoryUserRepository: InMemoryUserRepository
let sut: DeleteUserUseCase

describe('Delete User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new DeleteUserUseCase(inMemoryUserRepository)
  })

  it('should be possible delete a user', async () => {
    const newUser = makeUser()

    await inMemoryUserRepository.create(newUser)

    const result = await sut.execute({
      id: newUser.id.toValue(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryUserRepository.items).toHaveLength(0)
  })

  it('not be should delete a user doenst exists', async () => {
    const newUser = makeUser({}, new UniquieEntityId('user-1'))

    await inMemoryUserRepository.create(newUser)
    const result = await sut.execute({
      id: 'user-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotFoundError)
  })
})
