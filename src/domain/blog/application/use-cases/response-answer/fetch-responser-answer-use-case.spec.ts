import { FetchResponseAnswerByResponseAnswerUseCase } from './fetch-responser-answer-use-case'
import { InMemoryResponseAnswerRepository } from 'test/repositories/in-memory-response-answer-repository'
import { UniquieEntityId } from '@/core/entities/uniquie-entity-id'
import { makeResponseAnswer } from 'test/factories/make-response-answer'

let inMemoryResponseAnswerRepository: InMemoryResponseAnswerRepository
let sut: FetchResponseAnswerByResponseAnswerUseCase

describe('Response Answers', () => {
  beforeEach(() => {
    inMemoryResponseAnswerRepository = new InMemoryResponseAnswerRepository()
    sut = new FetchResponseAnswerByResponseAnswerUseCase(
      inMemoryResponseAnswerRepository,
    )
  })

  it('should be possible get response answer for a answer', async () => {
    const newResponseAnswer = makeResponseAnswer({
      answerId: new UniquieEntityId('answer-1'),
    })

    inMemoryResponseAnswerRepository.create(newResponseAnswer)

    const result = await sut.execute({
      answerId: newResponseAnswer.answerId.toValue(),
      page: 1,
    })

    assert(result.isRight(), 'Result not success')
    expect(result.value.responseAnswers).toHaveLength(1)
  })

  it('should be possible get response answer using page', async () => {
    for (let i = 0; i < 22; i++) {
      const newResponseAnswer = makeResponseAnswer({
        answerId: new UniquieEntityId('answer-1'),
      })

      inMemoryResponseAnswerRepository.create(newResponseAnswer)
    }

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 2,
    })

    assert(result.isRight(), 'Result not success')
    expect(result.value.responseAnswers).toHaveLength(2)
  })
})
