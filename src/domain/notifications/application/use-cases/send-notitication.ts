import { Notification } from '@/domain/notifications/enterprise/entities/notification'
import { NotificationRepository } from '@/domain/notifications/application/repositories/notification-repository'
import { UniquieEntityId } from '@/core/entities/uniquie-entity-id'
import { Either, right } from '@/core/either'
interface CreateNotificationUseCaseRequest {
  content: string
  title: string
  recipientId: string
}

type CreateNotificationUseCaseResponse = Either<
  null,
  {
    notification: Notification
  }
>

export class CreateNotificationUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute({
    content,
    title,
    recipientId,
  }: CreateNotificationUseCaseRequest): Promise<CreateNotificationUseCaseResponse> {
    const notification = await Notification.create({
      content,
      title,
      recipientId: new UniquieEntityId(recipientId),
    })

    await this.notificationRepository.create(notification)

    return right({ notification })
  }
}
