import { Optional } from '@/core/types/optional'
import { UniquieEntityId } from '@/core/entities/uniquie-entity-id'
import { Response, ResponseProps } from './response'

export interface AttachmentPostProps extends ResponseProps {
  answerId: UniquieEntityId
}

export class AttachmentPost extends Response<AttachmentPostProps> {
  get answerId() {
    return this.props.answerId
  }

  static create(
    props: Optional<AttachmentPostProps, 'createdAt'>,
    id?: UniquieEntityId,
  ) {
    const answer = new AttachmentPost(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return answer
  }
}
