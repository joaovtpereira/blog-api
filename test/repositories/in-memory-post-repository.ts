import { PostsRepository } from '@/domain/blog/application/repositories/post-repository'
import { Post } from '@/domain/blog/enterprise/entities/post'
export class InMemoryPostsRepository implements PostsRepository {
  public items: Post[] = []
  async create(post: Post) {
    this.items.push(post)
    return post
  }

  async findById(id: string) {
    const post = this.items.find((item) => item.id.toValue() === id)

    if (!post) {
      return null
    }

    return post
  }

  async delete(post: Post) {
    const postIndex = this.items.findIndex(
      (item) => item.id.toValue() === post.id.toValue(),
    )

    this.items.splice(postIndex, 1)
  }
}
