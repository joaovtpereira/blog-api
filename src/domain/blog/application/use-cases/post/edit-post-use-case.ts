import { Either, left, right } from '@/core/either'
import { PostsRepository } from '@/domain/blog/application/repositories/post-repository'
import { Post } from '@/domain/blog/enterprise/entities/post'
import { NotFoundError } from '@/core/errors/not-found-error'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { PostAttachmentsRepository } from '@/domain/blog/application/repositories/post-attachments-repository'
import { AttachmentsPostList } from '@/domain/blog/enterprise/entities/attachments-post-list'
import { AttachmentPost } from '@/domain/blog/enterprise/entities/attachments-post'
import { UniquieEntityId } from '@/core/entities/uniquie-entity-id'

interface EditPostUseCaseRequest {
  postId: string
  content: string
  authorId: string
  attachmentsId: string[]
}

type EditPostUseCaseResponse = Either<
  NotFoundError | NotAllowedError,
  {
    post: Post
  }
>

export class EditPostUseCase {
  constructor(
    private postRepository: PostsRepository,
    private attachmentsPostRepository: PostAttachmentsRepository,
  ) {}

  async execute(
    props: EditPostUseCaseRequest,
  ): Promise<EditPostUseCaseResponse> {
    const post = await this.postRepository.findById(props.postId)

    if (!post) {
      return left(new NotFoundError())
    }

    if (post.authorId.toValue() !== props.authorId) {
      return left(new NotAllowedError())
    }

    const currentAttachmentsPost =
      await this.attachmentsPostRepository.findManyByPostId(props.postId)

    const postAttachmentsList = new AttachmentsPostList(currentAttachmentsPost)

    const postAttachments = props.attachmentsId.map((attachmentId) => {
      return AttachmentPost.create({
        attachmentId: new UniquieEntityId(attachmentId),
        postId: post.id,
      })
    })

    postAttachmentsList.update(postAttachments)

    post.attachments = postAttachmentsList
    post.content = props.content

    await this.postRepository.save(post)

    return right({ post })
  }
}
