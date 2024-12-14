import { NotificationRepository } from '@/domain/notifications/application/repositories/notification-repository'
import { Notification } from '@/domain/notifications/enterprise/entities/notification'
export class InMemoryNotificationRepository implements NotificationRepository {
  public items: Notification[] = []

  async create(notification: Notification) {
    this.items.push(notification)
    return notification
  }

  async findById(id: string) {
    const notification = this.items.find((item) => item.id.toValue() === id)

    if (!notification) {
      return null
    }

    return notification
  }

  async save(notification: Notification) {
    const notificationIndex = this.items.findIndex(
      (item) => item.id.toValue() === notification.id.toValue(),
    )

    this.items[notificationIndex] = notification
  }
}
