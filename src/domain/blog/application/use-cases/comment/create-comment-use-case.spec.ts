import { InMemoryPostsRepository } from 'test/repositories/in-memory-post-repository'
import { CreateCommentUseCase } from './create-comment-use-case'
import { InMemoryCommentRepository } from 'test/repositories/in-memory-comment-repository'
import { makePost } from 'test/factories/make-post'
import { UniquieEntityId } from '@/core/entities/uniquie-entity-id'
import { NotFoundError } from '@/domain/blog/application/use-cases/errors/not-found-error'

let inMemoryCommentRepository: InMemoryCommentRepository
let inMemoryPostsRepository: InMemoryPostsRepository
let sut: CreateCommentUseCase

describe('Create Comment', () => {
  beforeEach(() => {
    inMemoryCommentRepository = new InMemoryCommentRepository()
    inMemoryPostsRepository = new InMemoryPostsRepository()
    sut = new CreateCommentUseCase(
      inMemoryCommentRepository,
      inMemoryPostsRepository,
    )
  })

  it('should be possible create a comment', async () => {
    const newPost = makePost()

    await inMemoryPostsRepository.create(newPost)

    const result = await sut.execute({
      authorId: 'João',
      content: 'any String',
      postId: newPost.id.toValue(),
    })

    assert(result.isRight(), 'Result not success')
    expect(inMemoryCommentRepository.items[0].id).toEqual(
      result.value.comment.id,
    )
    expect(inMemoryCommentRepository.items[0].content).toBe('any String')
  })

  it('not be should possible create a comment in a post doenst have existe', async () => {
    const newPost = makePost({}, new UniquieEntityId('post-1'))

    await inMemoryPostsRepository.create(newPost)

    const result = await sut.execute({
      authorId: 'João',
      content: 'any String',
      postId: 'post-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotFoundError)
  })
})
