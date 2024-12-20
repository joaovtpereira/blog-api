import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { UniquieEntityId } from '@/core/entities/uniquie-entity-id'
import { ResponseAnswerUseCase } from './response-a-answer-use-case'
import { InMemoryResponseAnswerRepository } from 'test/repositories/in-memory-response-answer-repository'
import { makeAnswer } from 'test/factories/makeAnswer'
import { NotFoundError } from '../../../../../core/errors/not-found-error'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let inMemoryResponseAnswerRepository: InMemoryResponseAnswerRepository
let sut: ResponseAnswerUseCase

describe('Response Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    inMemoryResponseAnswerRepository = new InMemoryResponseAnswerRepository()
    sut = new ResponseAnswerUseCase(
      inMemoryAnswerRepository,
      inMemoryResponseAnswerRepository,
    )
  })

  it('should be possible response a answer', async () => {
    const newAnswer = makeAnswer()

    await inMemoryAnswerRepository.create(newAnswer)

    const result = await sut.execute({
      authorId: 'author-1',
      content: 'any String',
      answerId: newAnswer.id.toValue(),
    })

    assert(result.isRight(), 'Result not success')
    expect(inMemoryResponseAnswerRepository.items[0].id).toEqual(
      result.value.responseAnswer.id,
    )
    expect(inMemoryResponseAnswerRepository.items[0].content).toBe('any String')
  })

  it('not be should possible reponse a answer in a answer doenst have existe', async () => {
    const newAnswer = makeAnswer({}, new UniquieEntityId('answer-1'))

    await inMemoryAnswerRepository.create(newAnswer)

    const result = await sut.execute({
      authorId: 'author-1',
      content: 'any String',
      answerId: 'answer-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotFoundError)
  })
})
