import { UniquieEntityId } from '@/core/entities/uniquie-entity-id'
import {
  Notification,
  NotificationProps,
} from '@/domain/notifications/enterprise/entities/notification'
import { faker } from '@faker-js/faker'

export function makeNotification(
  override: Partial<NotificationProps> = {},
  id?: UniquieEntityId,
) {
  const notification = Notification.create(
    {
      content: faker.lorem.sentence(30),
      recipientId: new UniquieEntityId(),
      title: faker.lorem.sentence(10),
      ...override,
    },
    id,
  )

  return notification
}
