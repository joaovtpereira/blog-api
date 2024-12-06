import { UniquieEntityId } from './uniquie-entity-id'

export class Entity<Props> {
  private _id: UniquieEntityId
  protected props: Props

  get id() {
    return this._id
  }

  protected constructor(props: Props, id?: UniquieEntityId) {
    this.props = props
    this._id = id ?? new UniquieEntityId()
  }
}
