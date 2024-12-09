import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { UniquieEntityId } from '@/core/entities/uniquie-entity-id'
import { ResponseAnswerUseCase } from './response-a-answer-use-case'
import { InMemoryResponseAnswerRepository } from 'test/repositories/in-memory-response-answer-repository'
import { makeAnswer } from 'test/factories/makeAnswer'

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

    const responseAnswer = await sut.execute({
      authorId: 'author-1',
      content: 'any String',
      answerId: newAnswer.id.toValue(),
    })

    expect(inMemoryResponseAnswerRepository.items[0].id).toEqual(
      responseAnswer.id,
    )
    expect(inMemoryResponseAnswerRepository.items[0].content).toBe('any String')
  })

  it('not be should possible reponse a answer in a answer doenst have existe', async () => {
    const newAnswer = makeAnswer({}, new UniquieEntityId('answer-1'))

    await inMemoryAnswerRepository.create(newAnswer)

    expect(async () => {
      await sut.execute({
        authorId: 'author-1',
        content: 'any String',
        answerId: 'answer-2',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
