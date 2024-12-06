import { Entity } from '../../../../core/entities/entity'
import { Optional } from '../../../../core/types/optional'
import { UniquieEntityId } from '../../../../core/entities/uniquie-entity-id'

interface UserProps {
  name: string
  email: string
  password: string
  created_at: Date
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  get created_at() {
    return this.props.created_at
  }

  static create(
    props: Optional<UserProps, 'created_at'>,
    id?: UniquieEntityId,
  ) {
    const answer = new User(
      {
        ...props,
        created_at: new Date(),
      },
      id,
    )

    return answer
  }
}
