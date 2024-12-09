import { ResponseAnswer } from '@/domain/blog/enterprise/entities/response-answer'

export interface ResponseAnswerRepository {
  create(responseanswer: ResponseAnswer): Promise<ResponseAnswer>
  findById(id: string): Promise<ResponseAnswer | null>
  save(responseanswer: ResponseAnswer): Promise<void>
}
