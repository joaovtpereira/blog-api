import { UseCaseError } from '@/core/errors/type/use-case-errors'

export class NotLikedPostError extends Error implements UseCaseError {
  constructor() {
    super('Not liked this post')
  }
}
