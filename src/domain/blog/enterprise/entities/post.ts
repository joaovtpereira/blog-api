import { Slug } from './value-objects/slug'
import { Optional } from '../../../../core/types/optional'
import { UniquieEntityId } from '../../../../core/entities/uniquie-entity-id'
import { AgregateRoot } from '@/core/entities/aggregate-root'
import { AttachmentsPostList } from './attachments-post-list'

export interface PostProps {
  title: string
  category: string
  authorId: UniquieEntityId
  content: string
  attachments: AttachmentsPostList
  slug: Slug
  created_at: Date
  likes: number
  dislikes: number
}

export class Post extends AgregateRoot<PostProps> {
  get title() {
    return this.props.title
  }

  get likes() {
    return this.props.likes
  }

  get attachments() {
    return this.props.attachments
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

  set attachments(attachments: AttachmentsPostList) {
    this.props.attachments = attachments
  }

  static create(
    props: Optional<
      PostProps,
      'created_at' | 'likes' | 'dislikes' | 'slug' | 'attachments'
    >,
    id?: UniquieEntityId,
  ) {
    const post = new Post(
      {
        ...props,
        created_at: new Date(),
        slug: props.slug ?? Slug.createSlugFromText(props.title),
        likes: 0,
        dislikes: 0,
        attachments: props.attachments ?? new AttachmentsPostList(),
      },
      id,
    )

    return post
  }
}
