import { UniquieEntityId } from '@/core/entities/uniquie-entity-id'
import { Entity } from '@/core/entities/entity'

interface AttachmentProps {
  name: string
  link: string
}

export class Attachment extends Entity<AttachmentProps> {
  get name() {
    return this.props.name
  }

  get link() {
    return this.props.link
  }

  set name(name: string) {
    this.props.name = name
  }

  set link(link: string) {
    this.props.link = link
  }

  static create(props: AttachmentProps, id?: UniquieEntityId) {
    const attachment = new Attachment(props, id)

    return attachment
  }
}
