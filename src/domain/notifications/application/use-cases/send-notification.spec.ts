import { InMemoryNotificationRepository } from 'test/repositories/in-memory-notification-repository'
import { makePost } from 'test/factories/make-post'
import { UniquieEntityId } from '@/core/entities/uniquie-entity-id'
import { makeComment } from 'test/factories/make-comment'
import { NotFoundError } from '@/domain/blog/application/use-cases/errors/not-found-error'
import { CreateNotificationUseCase } from './send-notitication'
import { makeNotification } from 'test/factories/make-notification'

let inMemoryNotificationRepository: InMemoryNotificationRepository

let sut: CreateNotificationUseCase

describe('Notification Notification', () => {
  beforeEach(() => {
    inMemoryNotificationRepository = new InMemoryNotificationRepository()
    sut = new CreateNotificationUseCase(inMemoryNotificationRepository)
  })

  it('should be possible send a notification', async () => {
    const result = await sut.execute({
      recipientId: 'author-1',
      content: 'any String',
      title: 'any String',
    })

    assert(result.isRight(), 'Result not success')
    expect(inMemoryNotificationRepository.items[0].id).toEqual(
      result.value.notification?.id,
    )
    expect(inMemoryNotificationRepository.items[0].content).toBe('any String')
  })
})
