import { InMemoryPostsRepository } from 'test/repositories/in-memory-post-repository'
import { EditAnswerUseCase } from './edit-answer-use-case'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { makePost } from 'test/factories/make-post'
import { UniquieEntityId } from '@/core/entities/uniquie-entity-id'
import { InMemoryCommentRepository } from 'test/repositories/in-memory-comment-repository'
import { makeComment } from 'test/factories/make-comment'
import { makeAnswer } from 'test/factories/makeAnswer'
import { NotFoundError } from '../../../../../core/errors/not-found-error'
import { NotAllowedError } from '../../../../../core/errors/not-allowed-error'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let inMemoryPostsRepository: InMemoryPostsRepository
let inMemoryCommentRepository: InMemoryCommentRepository
let sut: EditAnswerUseCase

describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    inMemoryPostsRepository = new InMemoryPostsRepository()
    inMemoryCommentRepository = new InMemoryCommentRepository()
    sut = new EditAnswerUseCase(inMemoryAnswerRepository)
  })

  it('should be possible edit a answer', async () => {
    const newPost = makePost()

    await inMemoryPostsRepository.create(newPost)

    const newComment = makeComment()

    await inMemoryCommentRepository.create(newComment)

    const newAnswer = makeAnswer({
      authorId: new UniquieEntityId('author-1'),
    })

    await inMemoryAnswerRepository.create(newAnswer)

    const result = await sut.execute({
      authorId: 'author-1',
      content: 'any String',
      answerId: newAnswer.id.toValue(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswerRepository.items[0].id).toEqual(newAnswer.id)
    expect(inMemoryAnswerRepository.items[0].content).toBe('any String')
  })

  it('not be should possible edit a answer in a answer doenst have existe', async () => {
    const newPost = makePost({}, new UniquieEntityId('post-1'))

    await inMemoryPostsRepository.create(newPost)

    const newAnswer = makeAnswer(
      {
        authorId: new UniquieEntityId('author-1'),
      },
      new UniquieEntityId('answer-1'),
    )

    await inMemoryAnswerRepository.create(newAnswer)

    const result = await sut.execute({
      authorId: 'author-1',
      content: 'any String',
      answerId: 'answer-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotFoundError)
  })

  it('not be should possible edit a answer from another user', async () => {
    const newPost = makePost({}, new UniquieEntityId('post-1'))

    await inMemoryPostsRepository.create(newPost)

    const newAnswer = makeAnswer({
      authorId: new UniquieEntityId('author-1'),
    })

    await inMemoryAnswerRepository.create(newAnswer)

    const result = await sut.execute({
      authorId: 'author-2',
      content: 'any String',
      answerId: newAnswer.id.toValue(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
