import { FetchAnswerByCommentUseCase } from './fetch-answers-by-comment'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { UniquieEntityId } from '@/core/entities/uniquie-entity-id'
import { makeAnswer } from 'test/factories/makeAnswer'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: FetchAnswerByCommentUseCase

describe('Answer Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new FetchAnswerByCommentUseCase(inMemoryAnswerRepository)
  })

  it('should be possible get answers for a comment', async () => {
    const newAnswer = makeAnswer({
      commentId: new UniquieEntityId('comment-1'),
    })

    inMemoryAnswerRepository.create(newAnswer)

    const result = await sut.execute({
      commentId: newAnswer.commentId.toValue(),
      page: 1,
    })

    assert(result.isRight(), 'Result not success')
    expect(result.value.answers).toHaveLength(1)
  })

  it('should be possible get answer using page', async () => {
    for (let i = 0; i < 22; i++) {
      const newAnswer = makeAnswer({
        commentId: new UniquieEntityId('comment-1'),
      })

      inMemoryAnswerRepository.create(newAnswer)
    }

    const result = await sut.execute({
      commentId: 'comment-1',
      page: 2,
    })

    assert(result.isRight(), 'Result not success')
    expect(result.value.answers).toHaveLength(2)
  })
})
