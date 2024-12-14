import { NotificationRepository } from '@/domain/notifications/application/repositories/notification-repository'
import { Either, left, right } from '@/core/either'
import { NotFoundError } from '@/domain/blog/application/use-cases/errors/not-found-error'
import { NotAllowedError } from '@/domain/blog/application/use-cases/errors/not-allowed-error'
interface ReadNotificationUseCaseRequest {
  notificationId: string
  recipientId: string
}

type ReadNotificationUseCaseResponse = Either<
  NotFoundError | NotAllowedError,
  NonNullable<unknown>
>

export class ReadNotificationUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute({
    notificationId,
    recipientId,
  }: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {
    const notification =
      await this.notificationRepository.findById(notificationId)

    if (!notification) return left(new NotFoundError())

    if (notification.recipientId.toValue() !== recipientId)
      return left(new NotAllowedError())

    notification.read()

    await this.notificationRepository.save(notification)

    return right({})
  }
}
