import { UniquieEntityId } from '@/core/entities/uniquie-entity-id'
import {
  AttachmentPost,
  AttachmentPostProps,
} from '@/domain/blog/enterprise/entities/attachments-post'

export function makeAttachmentPost(
  override: Partial<AttachmentPostProps> = {},
  id?: UniquieEntityId,
) {
  const attachmentpost = AttachmentPost.create(
    {
      attachmentId: new UniquieEntityId(),
      postId: new UniquieEntityId(),
      ...override,
    },
    id,
  )

  return attachmentpost
}
