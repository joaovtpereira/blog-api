import { Slug } from './value-objects/slug'
import { Entity } from '../../../../core/entities/entity'
import { Optional } from '../../../../core/types/optional'
import { UniquieEntityId } from '../../../../core/entities/uniquie-entity-id'

export interface PostProps {
  title: string
  category: string
  authorId: UniquieEntityId
  content: string
  slug: Slug
  created_at: Date
  likes: number
  dislikes: number
}

export class Post extends Entity<PostProps> {
  get title() {
    return this.props.title
  }

  get likes() {
    return this.props.likes
  }

  get dislikes() {
    return this.props.dislikes
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

  set likes(likes: number) {
    this.props.likes = likes
  }

  set dislikes(dislikes: number) {
    this.props.dislikes = dislikes
  }

  static create(
    props: Optional<PostProps, 'created_at' | 'likes' | 'dislikes' | 'slug'>,
    id?: UniquieEntityId,
  ) {
    const post = new Post(
      {
        ...props,
        created_at: new Date(),
        slug: props.slug ?? Slug.createSlugFromText(props.title),
        likes: 0,
        dislikes: 0,
      },
      id,
    )

    return post
  }
}
