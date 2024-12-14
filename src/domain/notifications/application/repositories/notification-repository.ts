import { Notification } from '@/domain/notifications/enterprise/entities/notification'

export interface NotificationRepository {
  create(notification: Notification): Promise<Notification>
  findById(id: string): Promise<Notification | null>
  save(notification: Notification): Promise<void>
}
