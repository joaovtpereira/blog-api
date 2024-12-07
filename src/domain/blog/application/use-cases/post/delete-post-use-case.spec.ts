import { DeletePostUseCase } from './delete-post-use-case'
import { InMemoryPostsRepository } from 'test/repositories/in-memory-post-repository'
import { makePost } from 'test/factories/make-post'
import { UniquieEntityId } from '@/core/entities/uniquie-entity-id'

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

    await sut.execute({
      authorId: 'author_1',
      postId: 'post-1',
    })

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

    expect(
      async () =>
        await sut.execute({
          authorId: 'author_2',
          postId: 'post-1',
        }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('not should be possible delete a post doenst exist', async () => {
    const newPost = makePost(
      {
        authorId: new UniquieEntityId('author_1'),
      },
      new UniquieEntityId('post-1'),
    )

    await inMemoryPostsRepository.create(newPost)

    expect(
      async () =>
        await sut.execute({
          authorId: 'author_1',
          postId: 'post-2',
        }),
    ).rejects.toBeInstanceOf(Error)
  })
})
