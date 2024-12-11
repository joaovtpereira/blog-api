import { InMemoryUserFeedbackRepository } from 'test/repositories/in-memory-user-feedback-repository'
import { LikingPostUseCase } from './liking-a-post-use-case'
import { InMemoryPostsRepository } from 'test/repositories/in-memory-post-repository'
import { makePost } from 'test/factories/make-post'
import { UniquieEntityId } from '@/core/entities/uniquie-entity-id'
import { NotFoundError } from '../errors/not-found-error'
import { AlreadyLikePostError } from '../errors/already-like-post-error'

let inMemoryUserFeedbackRepository: InMemoryUserFeedbackRepository
let inMemoryPostsRepository: InMemoryPostsRepository
let sut: LikingPostUseCase

describe('UserLike Post', () => {
  beforeEach(() => {
    inMemoryUserFeedbackRepository = new InMemoryUserFeedbackRepository()
    inMemoryPostsRepository = new InMemoryPostsRepository()
    sut = new LikingPostUseCase(
      inMemoryUserFeedbackRepository,
      inMemoryPostsRepository,
    )
  })

  it('should be possible like a post', async () => {
    const newPost = makePost(
      {
        authorId: new UniquieEntityId('author_1'),
      },
      new UniquieEntityId('post-1'),
    )

    await inMemoryPostsRepository.create(newPost)

    const result = await sut.execute({
      userId: 'author_1',
      postId: newPost.id.toValue(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryUserFeedbackRepository.items[0].id).toBeInstanceOf(
      UniquieEntityId,
    )
  })

  it('not be should possible like a post does not exist', async () => {
    const newPost = makePost(
      {
        authorId: new UniquieEntityId('author_1'),
      },
      new UniquieEntityId('post-1'),
    )

    await inMemoryPostsRepository.create(newPost)

    const result = await sut.execute({
      userId: 'author_1',
      postId: 'invalid_id',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotFoundError)
  })

  it('not be should possible like a post twice', async () => {
    const newPost = makePost(
      {
        authorId: new UniquieEntityId('author_1'),
      },
      new UniquieEntityId('post-1'),
    )

    await inMemoryPostsRepository.create(newPost)

    await sut.execute({
      userId: 'author_1',
      postId: newPost.id.toValue(),
    })

    const result = await sut.execute({
      userId: 'author_1',
      postId: newPost.id.toValue(),
    })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(AlreadyLikePostError)
  })
})
