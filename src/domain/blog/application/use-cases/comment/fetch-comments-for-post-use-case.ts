import { CommentRepository } from '@/domain/blog/application/repositories/comment-repository'
import { Either, right } from '@/core/either'
import { Comment } from '@/domain/blog/enterprise/entities/comment'

interface FetchCommentByCommentUseCaseRequest {
  postId: string
  page: number
}

type FetchCommentByCommentUseCaseResponse = Either<
  null,
  {
    comments: Comment[]
  }
>

export class FetchCommentByCommentUseCase {
  constructor(private commentRepository: CommentRepository) {}

  async execute({
    postId,
    page,
  }: FetchCommentByCommentUseCaseRequest): Promise<FetchCommentByCommentUseCaseResponse> {
    const comments = await this.commentRepository.findManyByPostId(postId, {
      page,
    })

    return right({ comments })
  }
}
