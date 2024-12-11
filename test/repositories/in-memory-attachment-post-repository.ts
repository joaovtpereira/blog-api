import { PostAttachmentsRepository } from '@/domain/blog/application/repositories/post-attachments-repository'
import { AttachmentPost } from '@/domain/blog/enterprise/entities/attachments-post'
export class InMemoryAttachmentPostRepository
  implements PostAttachmentsRepository
{
  public items: AttachmentPost[] = []

  async findManyByPostId(postId: string) {
    return this.items.filter((item) => item.postId === postId)
  }

  async deleteManyByPostId(postId: string) {
    this.items = this.items.filter((item) => item.postId !== postId)
  }
}
