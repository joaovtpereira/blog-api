import { PostsRepository } from '../repositories/post-repository'

interface DeletePostUseCaseRequest {
  authorId: string
  postId: string
}

interface DeletePostUseCaseResponse {}

export class DeletePostUseCase {
  constructor(private postRepository: PostsRepository) {}
  async execute({
    authorId,
    postId,
  }: DeletePostUseCaseRequest): Promise<DeletePostUseCaseResponse> {
    const post = await this.postRepository.findById(postId)

    if (!post) {
      throw new Error('Post not found')
    }

    if (post.authorId.toValue() !== authorId) {
      throw new Error('You are not the author of this post')
    }

    await this.postRepository.delete(post)

    return {}
  }
}
