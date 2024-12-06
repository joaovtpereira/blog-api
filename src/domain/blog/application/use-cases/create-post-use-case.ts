import { Post } from '../../enterprise/entities/post'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { PostsRepository } from '../repositories/post-repository'

interface CreatePostUseCaseRequest {
  title: string
  category: string
  content: string
  authorId: string
}

export class CreatePostUseCase {
  constructor(private postRepository: PostsRepository) {}

  async execute(props: CreatePostUseCaseRequest) {
    const post = Post.create({
      ...props,
      slug: Slug.createSlugFromText(props.title),
    })

    await this.postRepository.create(post)

    return post
  }
}
