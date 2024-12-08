import { Comment } from '@/domain/blog/enterprise/entities/comment'
import { CommentRepository } from '@/domain/blog/application/repositories/comment-repository'
import { PostsRepository } from '@/domain/blog/application/repositories/post-repository'
import { UniquieEntityId } from '@/core/entities/uniquie-entity-id'

interface CreateCommentUseCaseRequest {
  content: string
  postId: string
  authorId: string
}

export class CreateCommentUseCase {
  constructor(
    private commentRepository: CommentRepository,
    private postRepository: PostsRepository,
  ) {}

  async execute({ postId, content, authorId }: CreateCommentUseCaseRequest) {
    const post = await this.postRepository.findById(postId)

    if (!post) {
      throw new Error('Post not found')
    }

    const comment = Comment.create({
      content,
      postId: new UniquieEntityId(postId),
      authorId: new UniquieEntityId(authorId),
    })

    await this.commentRepository.create(comment)

    return comment
  }
}
