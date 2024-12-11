import { WatchedList } from '@/core/entities/watched-list'
import { AttachmentPost } from './attachments-post'

export class AttachmentsPostList extends WatchedList<AttachmentPost> {
  compareItems(a: AttachmentPost, b: AttachmentPost): boolean {
    return a.attachmentId === b.attachmentId
  }
}
