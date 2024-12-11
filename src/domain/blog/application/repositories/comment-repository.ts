import { PaginationParams } from '@/core/respositories/pagination-params'
import { Comment } from '@/domain/blog/enterprise/entities/comment'

export interface CommentRepository {
  create(comment: Comment): Promise<Comment>
  findById(id: string): Promise<Comment | null>
  save(comment: Comment): Promise<void>
  findManyByPostId(
    commentId: string,
    params: PaginationParams,
  ): Promise<Comment[]>
}
