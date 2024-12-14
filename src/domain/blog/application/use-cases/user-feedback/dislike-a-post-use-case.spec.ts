import { InMemoryUserFeedbackRepository } from 'test/repositories/in-memory-user-feedback-repository'
import { InMemoryPostsRepository } from 'test/repositories/in-memory-post-repository'
import { makePost } from 'test/factories/make-post'
import { UniquieEntityId } from '@/core/entities/uniquie-entity-id'
import { DislikePosttUseCase } from './dislike-a-post-use-case'
import { NotFoundError } from '../../../../../core/errors/not-found-error'
import { AlreadyDislikePostError } from '../../../../../core/errors/already-dislike-post-error'

let inMemoryUserFeedbackRepository: InMemoryUserFeedbackRepository
let inMemoryPostsRepository: InMemoryPostsRepository
let sut: DislikePosttUseCase

describe('Dislike a Post Use Case', () => {
  beforeEach(() => {
    inMemoryUserFeedbackRepository = new InMemoryUserFeedbackRepository()
    inMemoryPostsRepository = new InMemoryPostsRepository()
    sut = new DislikePosttUseCase(
      inMemoryUserFeedbackRepository,
      inMemoryPostsRepository,
    )
  })

  it('should be possible dislike a post', async () => {
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
    expect(inMemoryUserFeedbackRepository.items[0].liked).toBe(false)
  })

  it('not be should possible disliked a post does not exist', async () => {
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

  it('not be should possible dislike a post twice', async () => {
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
    expect(result.value).toBeInstanceOf(AlreadyDislikePostError)
  })
})
