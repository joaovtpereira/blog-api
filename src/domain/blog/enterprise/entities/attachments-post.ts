import { UniquieEntityId } from '@/core/entities/uniquie-entity-id'
import { Entity } from '@/core/entities/entity'

export interface AttachmentPostProps {
  postId: UniquieEntityId
  attachmentId: UniquieEntityId
}

export class AttachmentPost extends Entity<AttachmentPostProps> {
  get postId() {
    return this.props.postId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  static create(props: AttachmentPostProps, id?: UniquieEntityId) {
    const attachmentPost = new AttachmentPost(props, id)

    return attachmentPost
  }
}
