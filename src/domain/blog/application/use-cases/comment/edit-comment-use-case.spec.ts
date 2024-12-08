import { InMemoryPostsRepository } from 'test/repositories/in-memory-post-repository'
import { EditCommentUseCase } from './edit-comment-use-case'
import { InMemoryCommentRepository } from 'test/repositories/in-memory-comment-repository'
import { makePost } from 'test/factories/make-post'
import { UniquieEntityId } from '@/core/entities/uniquie-entity-id'
import { makeComment } from 'test/factories/make-comment'

let inMemoryCommentRepository: InMemoryCommentRepository
let inMemoryPostsRepository: InMemoryPostsRepository
let sut: EditCommentUseCase

describe('Edit Comment', () => {
  beforeEach(() => {
    inMemoryCommentRepository = new InMemoryCommentRepository()
    inMemoryPostsRepository = new InMemoryPostsRepository()
    sut = new EditCommentUseCase(inMemoryCommentRepository)
  })

  it('should be possible edit a comment', async () => {
    const newPost = makePost()

    await inMemoryPostsRepository.create(newPost)

    const newComment = makeComment({
      authorId: new UniquieEntityId('author-1'),
    })

    await inMemoryCommentRepository.create(newComment)

    await sut.execute({
      authorId: 'author-1',
      content: 'any String',
      commentId: newComment.id.toValue(),
    })

    expect(inMemoryCommentRepository.items[0].id).toEqual(newComment.id)
    expect(inMemoryCommentRepository.items[0].content).toBe('any String')
  })

  it('not be should possible edit a comment in a comment doenst have existe', async () => {
    const newPost = makePost({}, new UniquieEntityId('post-1'))

    await inMemoryPostsRepository.create(newPost)

    const newComment = makeComment(
      {
        authorId: new UniquieEntityId('author-1'),
      },
      new UniquieEntityId('comment-1'),
    )

    await inMemoryCommentRepository.create(newComment)

    expect(async () => {
      await sut.execute({
        authorId: 'author-1',
        content: 'any String',
        commentId: 'comment-2',
      })
    }).rejects.toBeInstanceOf(Error)
  })

  it('not be should possible edit a comment from another user', async () => {
    const newPost = makePost({}, new UniquieEntityId('post-1'))

    await inMemoryPostsRepository.create(newPost)

    const newComment = makeComment({
      authorId: new UniquieEntityId('author-1'),
    })

    await inMemoryCommentRepository.create(newComment)

    expect(async () => {
      await sut.execute({
        authorId: 'author-2',
        content: 'any String',
        commentId: newComment.id.toValue(),
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
