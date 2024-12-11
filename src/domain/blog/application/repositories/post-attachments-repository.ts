import { AttachmentPost } from '../../enterprise/entities/attachments-post'

export interface PostAttachmentsRepository {
  findManyByPostId(postId: string): Promise<AttachmentPost[]>
  deleteManyByPostId(postId: string): Promise<void>
}
