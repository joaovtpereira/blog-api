import { EventHandler } from '@/core/events/event-handler'
import { DomainEvents } from '@/core/events/domain-events'
import { PostsRepository } from '@/domain/blog/application/repositories/post-repository'
import { CreateNotificationUseCase } from '../use-cases/send-notitication'
import { OnCommentCreatedEvent } from '@/domain/blog/application/events/on-comment-post-event'

export class OnCommentCreated implements EventHandler {
  constructor(
    private sendNotification: CreateNotificationUseCase,
    private postRepository: PostsRepository,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewCommentNotification.bind(this),
      OnCommentCreatedEvent.name,
    )
  }

  private async sendNewCommentNotification({ comment }: OnCommentCreatedEvent) {
    const post = await this.postRepository.findById(comment.postId.toValue())
    if (post) {
      this.sendNotification.execute({
        title: 'Novo comentário',
        content: `Novo comentário no post ${post.title}`,
        recipientId: comment.authorId.toValue(),
      })
    }
  }
}
