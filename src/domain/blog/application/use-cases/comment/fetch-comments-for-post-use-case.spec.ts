import { FetchCommentByCommentUseCase } from './fetch-comments-for-post-use-case'
import { InMemoryCommentRepository } from 'test/repositories/in-memory-comment-repository'
import { UniquieEntityId } from '@/core/entities/uniquie-entity-id'
import { makeComment } from 'test/factories/make-comment'

let inMemoryCommentRepository: InMemoryCommentRepository
let sut: FetchCommentByCommentUseCase

describe('Comment Comment', () => {
  beforeEach(() => {
    inMemoryCommentRepository = new InMemoryCommentRepository()
    sut = new FetchCommentByCommentUseCase(inMemoryCommentRepository)
  })

  it('should be possible get comments for a post', async () => {
    const newComment = makeComment({
      postId: new UniquieEntityId('comment-1'),
    })

    inMemoryCommentRepository.create(newComment)

    const result = await sut.execute({
      postId: newComment.postId.toValue(),
      page: 1,
    })

    assert(result.isRight(), 'Result not success')
    expect(result.value.comments).toHaveLength(1)
  })

  it('should be possible get comment using page', async () => {
    for (let i = 0; i < 22; i++) {
      const newComment = makeComment({
        postId: new UniquieEntityId('comment-1'),
      })

      inMemoryCommentRepository.create(newComment)
    }

    const result = await sut.execute({
      postId: 'comment-1',
      page: 2,
    })

    assert(result.isRight(), 'Result not success')
    expect(result.value.comments).toHaveLength(2)
  })
})
