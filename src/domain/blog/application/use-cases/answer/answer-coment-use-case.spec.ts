import { InMemoryPostsRepository } from 'test/repositories/in-memory-post-repository'
import { CreateAnswerUseCase } from './answer-coment-use-case'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { makePost } from 'test/factories/make-post'
import { UniquieEntityId } from '@/core/entities/uniquie-entity-id'
import { InMemoryCommentRepository } from 'test/repositories/in-memory-comment-repository'
import { makeComment } from 'test/factories/make-comment'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let inMemoryPostsRepository: InMemoryPostsRepository
let inMemoryCommentRepository: InMemoryCommentRepository
let sut: CreateAnswerUseCase

describe('Answer Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    inMemoryPostsRepository = new InMemoryPostsRepository()
    inMemoryCommentRepository = new InMemoryCommentRepository()
    sut = new CreateAnswerUseCase(
      inMemoryAnswerRepository,
      inMemoryCommentRepository,
    )
  })

  it('should be possible create a answer for a comment', async () => {
    const newPost = makePost()

    await inMemoryPostsRepository.create(newPost)

    const newComment = makeComment()

    await inMemoryCommentRepository.create(newComment)

    const comment = await sut.execute({
      authorId: 'author-1',
      content: 'any String',
      commentId: newComment.id.toValue(),
    })

    expect(inMemoryAnswerRepository.items[0].id).toEqual(comment.id)
    expect(inMemoryAnswerRepository.items[0].content).toBe('any String')
  })

  it('not be should possible create a answer in a comment doenst have existe', async () => {
    const newPost = makePost({}, new UniquieEntityId('post-1'))

    await inMemoryPostsRepository.create(newPost)

    const newComment = makeComment({}, new UniquieEntityId('comment-1'))

    await inMemoryCommentRepository.create(newComment)

    expect(async () => {
      await sut.execute({
        authorId: 'author-1',
        content: 'any String',
        commentId: 'comment-2',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
