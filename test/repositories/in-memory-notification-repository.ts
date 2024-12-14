import { NotificationRepository } from '@/domain/notifications/application/repositories/notification-repository'
import { Notification } from '@/domain/notifications/enterprise/entities/notification'
export class InMemoryNotificationRepository implements NotificationRepository {
  public items: Notification[] = []

  async create(notification: Notification) {
    this.items.push(notification)
    return notification
  }
}
