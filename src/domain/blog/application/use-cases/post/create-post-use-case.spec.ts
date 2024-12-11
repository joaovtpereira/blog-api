import { UniquieEntityId } from '@/core/entities/uniquie-entity-id'
import { CreatePostUseCase } from './create-post-use-case'
import { InMemoryPostsRepository } from 'test/repositories/in-memory-post-repository'
import { InMemoryAttachmentPostRepository } from 'test/repositories/in-memory-attachment-post-repository'

let inMemoryPostsRepository: InMemoryPostsRepository
let inMemoryAttachmentPostRepository: InMemoryAttachmentPostRepository

let sut: CreatePostUseCase

describe('Create Post', () => {
  beforeEach(() => {
    inMemoryAttachmentPostRepository = new InMemoryAttachmentPostRepository()
    inMemoryPostsRepository = new InMemoryPostsRepository(
      inMemoryAttachmentPostRepository,
    )
    sut = new CreatePostUseCase(inMemoryPostsRepository)
  })
  it('should be possible create a post', async () => {
    const result = await sut.execute({
      authorId: 'author_1',
      title: 'any_title',
      category: 'any_category',
      content: 'any_content',
      attachmentsId: ['attachment1', 'attachment2'],
    })

    assert(result.isRight(), 'Result not success')
    expect(inMemoryPostsRepository.items[0].id).toEqual(result.value.post.id)
    expect(inMemoryPostsRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({
        attachmentId: new UniquieEntityId('attachment1'),
      }),
      expect.objectContaining({
        attachmentId: new UniquieEntityId('attachment2'),
      }),
    ])
  })
})
