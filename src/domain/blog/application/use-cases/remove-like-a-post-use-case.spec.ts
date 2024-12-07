import { InMemoryUserLikesRepository } from 'test/repositories/in-memory-user-likes-repository'
import { LikingPostUseCase } from './liking-a-post-use-case'
import { InMemoryPostsRepository } from 'test/repositories/in-memory-post-repository'
import { makePost } from 'test/factories/make-post'
import { UniquieEntityId } from '@/core/entities/uniquie-entity-id'
import { RemoveLikePosttUseCase } from './remove-like-a-post-use-case'

let inMemoryUserLikesRepository: InMemoryUserLikesRepository
let inMemoryPostsRepository: InMemoryPostsRepository

let sutLikingAPost: LikingPostUseCase
let sut: RemoveLikePosttUseCase

describe('RemoveLike Post', () => {
  beforeEach(() => {
    inMemoryUserLikesRepository = new InMemoryUserLikesRepository()
    inMemoryPostsRepository = new InMemoryPostsRepository()
    sut = new RemoveLikePosttUseCase(
      inMemoryUserLikesRepository,
      inMemoryPostsRepository,
    )
    sutLikingAPost = new LikingPostUseCase(
      inMemoryUserLikesRepository,
      inMemoryPostsRepository,
    )
  })

  it('should be possible remove like from post', async () => {
    const newPost = makePost(
      {
        authorId: new UniquieEntityId('author_1'),
      },
      new UniquieEntityId('post-1'),
    )

    await inMemoryPostsRepository.create(newPost)

    await sutLikingAPost.execute({
      userId: 'author_1',
      postId: newPost.id.toValue(),
    })

    await sut.execute({
      userId: 'author_1',
      postId: newPost.id.toValue(),
    })

    expect(inMemoryUserLikesRepository.items).toHaveLength(0)
  })

  it('not be should possible remove like a post does not exist', async () => {
    const newPost = makePost(
      {
        authorId: new UniquieEntityId('author_1'),
      },
      new UniquieEntityId('post-1'),
    )

    await inMemoryPostsRepository.create(newPost)

    expect(() =>
      sut.execute({
        userId: 'author_1',
        postId: 'invalid_id',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('not be should possible like a post when user doesnt have like', async () => {
    const newPost = makePost(
      {
        authorId: new UniquieEntityId('author_1'),
      },
      new UniquieEntityId('post-1'),
    )

    await inMemoryPostsRepository.create(newPost)

    expect(() =>
      sut.execute({
        userId: 'author_1',
        postId: newPost.id.toValue(),
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
