import { CommentRepository } from '@/domain/blog/application/repositories/comment-repository'
import { Comment } from '@/domain/blog/enterprise/entities/comment'
export class InMemoryCommentRepository implements CommentRepository {
  public items: Comment[] = []

  async create(comment: Comment) {
    this.items.push(comment)
    return comment
  }
}
