import { InMemoryUserFeedbackRepository } from 'test/repositories/in-memory-user-feedback-repository'
import { InMemoryPostsRepository } from 'test/repositories/in-memory-post-repository'
import { makePost } from 'test/factories/make-post'
import { UniquieEntityId } from '@/core/entities/uniquie-entity-id'
import { RemoveDislikedPosttUseCase } from './remove-dislike-a-post-use-case'
import { DislikePosttUseCase } from './dislike-a-post-use-case'
import { NotFoundError } from '../errors/not-found-error'
import { NotDislikedPostError } from '../errors/not-disliked-post-error'

let inMemoryUserFeedbackRepository: InMemoryUserFeedbackRepository
let inMemoryPostsRepository: InMemoryPostsRepository

let sutDislikeAPost: DislikePosttUseCase
let sut: RemoveDislikedPosttUseCase

describe('Remove Dislike Post use Case', () => {
  beforeEach(() => {
    inMemoryUserFeedbackRepository = new InMemoryUserFeedbackRepository()
    inMemoryPostsRepository = new InMemoryPostsRepository()
    sut = new RemoveDislikedPosttUseCase(
      inMemoryUserFeedbackRepository,
      inMemoryPostsRepository,
    )
    sutDislikeAPost = new DislikePosttUseCase(
      inMemoryUserFeedbackRepository,
      inMemoryPostsRepository,
    )
  })

  it('should be possible remove dislike from post', async () => {
    const newPost = makePost(
      {
        authorId: new UniquieEntityId('author_1'),
      },
      new UniquieEntityId('post-1'),
    )

    await inMemoryPostsRepository.create(newPost)

    await sutDislikeAPost.execute({
      userId: 'author_1',
      postId: newPost.id.toValue(),
    })

    expect(inMemoryUserFeedbackRepository.items[0].liked).toBe(false)

    const result = await sut.execute({
      userId: 'author_1',
      postId: newPost.id.toValue(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryUserFeedbackRepository.items).toHaveLength(0)
  })

  it('not be should possible remove dislike a post does not exist', async () => {
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

  it('not be should possible dislike a post when user doesnt have like', async () => {
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

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotDislikedPostError)
  })
})
