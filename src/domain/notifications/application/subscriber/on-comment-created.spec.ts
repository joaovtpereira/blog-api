import { makeComment } from 'test/factories/make-comment'

import { makePost } from 'test/factories/make-post'
import { InMemoryPostsRepository } from 'test/repositories/in-memory-post-repository'
import { InMemoryAttachmentPostRepository } from 'test/repositories/in-memory-attachment-post-repository'
import { InMemoryCommentRepository } from 'test/repositories/in-memory-comment-repository'
import { InMemoryNotificationRepository } from 'test/repositories/in-memory-notification-repository'
import { CreateNotificationUseCase } from '../use-cases/send-notitication'
import { OnCommentCreated } from './on-comment-created'
import { MockInstance } from 'vitest'
import { waitFor } from 'test/utils/wait-for'

let inMemoryAttachmentPostRepository: InMemoryAttachmentPostRepository
let inMemoryPostsRepository: InMemoryPostsRepository
let inMemoryCommentsRepository: InMemoryCommentRepository
let inMemoryNotificationsRepository: InMemoryNotificationRepository
let sendNotificationUseCase: CreateNotificationUseCase

let sendNotificationExecuteSpy: MockInstance

describe('On Comment Created', () => {
  beforeEach(() => {
    inMemoryAttachmentPostRepository = new InMemoryAttachmentPostRepository()
    inMemoryPostsRepository = new InMemoryPostsRepository(
      inMemoryAttachmentPostRepository,
    )
    inMemoryCommentsRepository = new InMemoryCommentRepository()
    inMemoryNotificationsRepository = new InMemoryNotificationRepository()
    sendNotificationUseCase = new CreateNotificationUseCase(
      inMemoryNotificationsRepository,
    )

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')

    new OnCommentCreated(sendNotificationUseCase, inMemoryPostsRepository)
  })

  it('should  send a notification when an comment is created', async () => {
    const post = makePost()
    const comment = makeComment({ postId: post.id })

    inMemoryPostsRepository.create(post)
    inMemoryCommentsRepository.create(comment)

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})
