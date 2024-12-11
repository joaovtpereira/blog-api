import { UniquieEntityId } from '@/core/entities/uniquie-entity-id'
import { Post } from '@/domain/blog/enterprise/entities/post'
import { PostsRepository } from '@/domain/blog/application/repositories/post-repository'
import { Either, right } from '@/core/either'
import { AttachmentPost } from '@/domain/blog/enterprise/entities/attachments-post'
import { AttachmentsPostList } from '@/domain/blog/enterprise/entities/attachments-post-list'

interface CreatePostUseCaseRequest {
  title: string
  category: string
  content: string
  authorId: string
  attachmentsId: string[]
}

type CreatePostUseCaseResponse = Either<
  null,
  {
    post: Post
  }
>

export class CreatePostUseCase {
  constructor(private postRepository: PostsRepository) {}
  async execute(
    props: CreatePostUseCaseRequest,
  ): Promise<CreatePostUseCaseResponse> {
    const post = Post.create({
      ...props,
      authorId: new UniquieEntityId(props.authorId),
    })

    const postAttachments = props.attachmentsId.map((attachmentId) => {
      return AttachmentPost.create({
        attachmentId: new UniquieEntityId(attachmentId),
        postId: post.id,
      })
    })

    post.attachments = new AttachmentsPostList(postAttachments)

    await this.postRepository.create(post)

    return right({ post })
  }
}
