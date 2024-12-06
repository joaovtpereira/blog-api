import { UniquieEntityId } from '@/core/entities/uniquie-entity-id'
import { Post } from '../../enterprise/entities/post'
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
      authorId: new UniquieEntityId(props.authorId),
    })

    await this.postRepository.create(post)

    return post
  }
}
