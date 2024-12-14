import { makeNotification } from 'test/factories/make-notification'
import { UniquieEntityId } from '@/core/entities/uniquie-entity-id'
import { InMemoryNotificationRepository } from 'test/repositories/in-memory-notification-repository'
import { ReadNotificationUseCase } from './read-notification'
import { NotAllowedError } from '@/domain/blog/application/use-cases/errors/not-allowed-error'
import { NotFoundError } from '@/domain/blog/application/use-cases/errors/not-found-error'

let inMemoryNotificationsRepository: InMemoryNotificationRepository
let sut: ReadNotificationUseCase

describe('Read Notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationRepository()
    sut = new ReadNotificationUseCase(inMemoryNotificationsRepository)
  })

  it('should be possible read a notification', async () => {
    const newNotification = makeNotification(
      {
        recipientId: new UniquieEntityId('author_1'),
      },
      new UniquieEntityId('notification-1'),
    )

    await inMemoryNotificationsRepository.create(newNotification)

    const result = await sut.execute({
      recipientId: 'author_1',
      notificationId: 'notification-1',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationsRepository.items[0].readAt).toEqual(
      expect.any(Date),
    )
  })

  it('not should be possible read a notification from another user', async () => {
    const newNotification = makeNotification(
      {
        recipientId: new UniquieEntityId('author_1'),
      },
      new UniquieEntityId('notification-1'),
    )

    await inMemoryNotificationsRepository.create(newNotification)

    const result = await sut.execute({
      recipientId: 'author_2',
      notificationId: 'notification-1',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })

  it('not should be possible read a notification doenst exist', async () => {
    const newNotification = makeNotification(
      {
        recipientId: new UniquieEntityId('author_1'),
      },
      new UniquieEntityId('notification-1'),
    )

    await inMemoryNotificationsRepository.create(newNotification)

    const result = await sut.execute({
      recipientId: 'author_1',
      notificationId: 'notification-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotFoundError)
  })
})
