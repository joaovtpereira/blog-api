import { Comment } from '@/domain/blog/enterprise/entities/comment'

export interface CommentRepository {
  create(comment: Comment): Promise<Comment>
}
