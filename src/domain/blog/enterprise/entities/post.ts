import { Slug } from './value-objects/slug'
import { Entity } from '../../../../core/entities/entity'
import { Optional } from '../../../../core/types/optional'
import { UniquieEntityId } from '../../../../core/entities/uniquie-entity-id'

export interface PostProps {
  title: string
  category: string
  authorId: string
  content: string
  slug: Slug
  created_at: Date
}

export class Post extends Entity<PostProps> {
  get title() {
    return this.props.title
  }

  get category() {
    return this.props.category
  }

  get authorId() {
    return this.props.authorId
  }

  get content() {
    return this.props.content
  }

  get slug() {
    return this.props.slug
  }

  get created_at() {
    return this.props.created_at
  }

  set content(content: string) {
    this.props.content = content
  }

  static create(
    props: Optional<PostProps, 'created_at'>,
    id?: UniquieEntityId,
  ) {
    const post = new Post(
      {
        ...props,
        created_at: new Date(),
      },
      id,
    )

    return post
  }
}
