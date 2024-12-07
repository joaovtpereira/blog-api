import { PostsRepository } from '@/domain/blog/application/repositories/post-repository'
import { Post } from '@/domain/blog/enterprise/entities/post'

interface EditPostUseCaseRequest {
  postId: string
  content: string
  authorId: string
}

interface EditPostUseCaseResponse {
  post: Post
}

export class EditPostUseCase {
  constructor(private postRepository: PostsRepository) {}

  async execute(
    props: EditPostUseCaseRequest,
  ): Promise<EditPostUseCaseResponse> {
    const post = await this.postRepository.findById(props.postId)

    if (!post) {
      throw new Error('Post not found')
    }

    if (post.authorId.toValue() !== props.authorId) {
      throw new Error('You are not the author of this post')
    }

    post.content = props.content

    await this.postRepository.save(post)

    return { post }
  }
}
