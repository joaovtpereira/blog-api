import { UseCaseError } from '@/core/errors/type/use-case-errors'

export class NotDislikedPostError extends Error implements UseCaseError {
  constructor() {
    super('Not disliked this post')
  }
}
