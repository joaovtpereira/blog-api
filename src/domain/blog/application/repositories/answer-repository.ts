import { PaginationParams } from '@/core/respositories/pagination-params'
import { Answer } from '@/domain/blog/enterprise/entities/answer'

export interface AnswerRepository {
  create(answer: Answer): Promise<Answer>
  findById(id: string): Promise<Answer | null>
  save(answer: Answer): Promise<void>
  findManyByCommentId(
    commentId: string,
    params: PaginationParams,
  ): Promise<Answer[]>
}
