import { CreatePostUseCase } from './create-post-use-case'
import { InMemoryPostsRepository } from 'test/repositories/in-memory-post-repository'

let inMemoryPostsRepository: InMemoryPostsRepository
let sut: CreatePostUseCase

describe('Create Post', () => {
  beforeEach(() => {
    inMemoryPostsRepository = new InMemoryPostsRepository()
    sut = new CreatePostUseCase(inMemoryPostsRepository)
  })
  it('should be possible create a post', async () => {
    const post = await sut.execute({
      authorId: 'author_1',
      title: 'any_title',
      category: 'any_category',
      content: 'any_content',
    })

    expect(inMemoryPostsRepository.items[0].id).toEqual(post.id)
  })
})
