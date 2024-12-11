import { EditPostUseCase } from './edit-post-use-case'
import { InMemoryPostsRepository } from 'test/repositories/in-memory-post-repository'
import { makePost } from 'test/factories/make-post'
import { UniquieEntityId } from '@/core/entities/uniquie-entity-id'
import { NotAllowedError } from '../errors/not-allowed-error'
import { NotFoundError } from '../errors/not-found-error'
import { InMemoryAttachmentPostRepository } from 'test/repositories/in-memory-attachment-post-repository'
import { makeAttachmentPost } from 'test/factories/make-attachment-post'

let inMemoryPostsRepository: InMemoryPostsRepository
let inMemoryAttachmentPostRepository: InMemoryAttachmentPostRepository
let sut: EditPostUseCase

describe('Edit Post', () => {
  beforeEach(() => {
    inMemoryAttachmentPostRepository = new InMemoryAttachmentPostRepository()
    inMemoryPostsRepository = new InMemoryPostsRepository(
      inMemoryAttachmentPostRepository,
    )
    sut = new EditPostUseCase(
      inMemoryPostsRepository,
      inMemoryAttachmentPostRepository,
    )
  })

  it('should be possible edit a post', async () => {
    const newPost = makePost({
      authorId: new UniquieEntityId('author_1'),
    })

    inMemoryAttachmentPostRepository.items.push(
      makeAttachmentPost({
        postId: newPost.id,
        attachmentId: new UniquieEntityId('attachment-1'),
      }),
      makeAttachmentPost({
        postId: newPost.id,
        attachmentId: new UniquieEntityId('attachment-2'),
      }),
      makeAttachmentPost({
        postId: newPost.id,
        attachmentId: new UniquieEntityId('attachment-3'),
      }),
    )

    await inMemoryPostsRepository.create(newPost)

    const result = await sut.execute({
      authorId: 'author_1',
      postId: newPost.id.toValue(),
      content: 'any_content',
      attachmentsId: ['attachment-1', 'attachment-3'],
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryPostsRepository.items[0].content).toBe('any_content')
    expect(
      inMemoryPostsRepository.items[0].attachments.currentItems,
    ).toHaveLength(2)
    expect(inMemoryPostsRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({
        attachmentId: new UniquieEntityId('attachment-1'),
      }),
      expect.objectContaining({
        attachmentId: new UniquieEntityId('attachment-3'),
      }),
    ])
    expect(inMemoryPostsRepository.items[0].attachments.remove).toHaveLength(1)
  })

  it('not should be possible edit a post from another user', async () => {
    const newPost = makePost({
      authorId: new UniquieEntityId('author_1'),
    })

    await inMemoryPostsRepository.create(newPost)

    const result = await sut.execute({
      authorId: 'author_2',
      postId: newPost.id.toValue(),
      content: 'any_content',
      attachmentsId: [],
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })

  it('not should be possible edit a post doenst exist', async () => {
    const newPost = makePost(
      {
        authorId: new UniquieEntityId('author_1'),
      },
      new UniquieEntityId('post-1'),
    )

    await inMemoryPostsRepository.create(newPost)

    const result = await sut.execute({
      authorId: 'author_1',
      postId: 'post-2',
      content: 'any_content',
      attachmentsId: [],
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotFoundError)
  })
})
