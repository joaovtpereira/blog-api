import { Comment } from '@/domain/blog/enterprise/entities/comment'

export interface CommentRepository {
  create(comment: Comment): Promise<Comment>
  findById(id: string): Promise<Comment | null>
  save(comment: Comment): Promise<void>
}
