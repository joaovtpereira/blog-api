import { expect, test } from 'vitest'

import { Post } from '../../enterprise/entities/post'
import { PostsRepository } from '../repositories/post-repository'
import { CreatePostUseCase } from './create-post-use-case'

const fakePostRepository: PostsRepository = {
  create: async (post: Post): Promise<Post> => {
    return post
  },
}

test('create a post', async () => {
  const answerQuestion = new CreatePostUseCase(fakePostRepository)

  const post = await answerQuestion.execute({
    title: 'Hello World Test',
    category: 'Test',
    authorId: '1',
    content: 'Test',
  })

  expect(post.slug.value).toBe('hello-world-test')
})
