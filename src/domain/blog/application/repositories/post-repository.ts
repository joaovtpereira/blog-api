import { Post } from '@/domain/blog/enterprise/entities/post'

export interface PostsRepository {
  create(post: Post): Promise<Post>
}
