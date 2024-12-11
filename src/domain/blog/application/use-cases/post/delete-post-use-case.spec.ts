import { DeletePostUseCase } from './delete-post-use-case'
import { InMemoryPostsRepository } from 'test/repositories/in-memory-post-repository'
import { makePost } from 'test/factories/make-post'
import { UniquieEntityId } from '@/core/entities/uniquie-entity-id'
import { NotAllowedError } from '../errors/not-allowed-error'
import { NotFoundError } from '../errors/not-found-error'

let inMemoryPostsRepository: InMemoryPostsRepository
let sut: DeletePostUseCase

describe('Delete Post', () => {
  beforeEach(() => {
    inMemoryPostsRepository = new InMemoryPostsRepository()
    sut = new DeletePostUseCase(inMemoryPostsRepository)
  })

  it('should be possible delete a post', async () => {
    const newPost = makePost(
      {
        authorId: new UniquieEntityId('author_1'),
      },
      new UniquieEntityId('post-1'),
    )

    await inMemoryPostsRepository.create(newPost)

    const result = await sut.execute({
      authorId: 'author_1',
      postId: 'post-1',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryPostsRepository.items).toHaveLength(0)
  })

  it('not should be possible delete a post from another user', async () => {
    const newPost = makePost(
      {
        authorId: new UniquieEntityId('author_1'),
      },
      new UniquieEntityId('post-1'),
    )

    await inMemoryPostsRepository.create(newPost)

    const result = await sut.execute({
      authorId: 'author_2',
      postId: 'post-1',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })

  it('not should be possible delete a post doenst exist', async () => {
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
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotFoundError)
  })
})
