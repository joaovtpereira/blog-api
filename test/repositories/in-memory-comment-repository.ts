import { CommentRepository } from '@/domain/blog/application/repositories/comment-repository'
import { Comment } from '@/domain/blog/enterprise/entities/comment'
export class InMemoryCommentRepository implements CommentRepository {
  public items: Comment[] = []

  async findById(id: string) {
    const comment = this.items.find((item) => item.id.toValue() === id)

    if (!comment) {
      return null
    }

    return comment
  }

  async create(comment: Comment) {
    this.items.push(comment)
    return comment
  }

  async save(comment: Comment) {
    const commentIndex = this.items.findIndex(
      (item) => item.id.toValue() === comment.id.toValue(),
    )

    this.items[commentIndex] = comment
  }
}
