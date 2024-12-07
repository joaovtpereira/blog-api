import { Post } from '@/domain/blog/enterprise/entities/post'

export interface PostsRepository {
  create(post: Post): Promise<Post>
  findById(id: string): Promise<Post | null>
  delete(post: Post): Promise<void>
  save(post: Post): Promise<void>
}
