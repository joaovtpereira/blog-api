import { EditPostUseCase } from './edit-post-use-case'
import { InMemoryPostsRepository } from 'test/repositories/in-memory-post-repository'
import { makePost } from 'test/factories/make-post'
import { UniquieEntityId } from '@/core/entities/uniquie-entity-id'
import { NotAllowedError } from '../errors/not-allowed-error'
import { NotFoundError } from '../errors/not-found-error'
import { InMemoryAttachmentPostRepository } from 'test/repositories/in-memory-attachment-post-repository'

let inMemoryPostsRepository: InMemoryPostsRepository
let inMemoryAttachmentPostRepository: InMemoryAttachmentPostRepository
let sut: EditPostUseCase

describe('Edit Post', () => {
  beforeEach(() => {
    inMemoryAttachmentPostRepository = new InMemoryAttachmentPostRepository()
    inMemoryPostsRepository = new InMemoryPostsRepository(
      inMemoryAttachmentPostRepository,
    )
    sut = new EditPostUseCase(inMemoryPostsRepository)
  })

  it('should be possible edit a post', async () => {
    const newPost = makePost({
      authorId: new UniquieEntityId('author_1'),
    })

    await inMemoryPostsRepository.create(newPost)

    const result = await sut.execute({
      authorId: 'author_1',
      postId: newPost.id.toValue(),
      content: 'any_content',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryPostsRepository.items[0].content).toBe('any_content')
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
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotFoundError)
  })
})
