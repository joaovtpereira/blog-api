import { UseCaseError } from '@/core/errors/use-case-errors'

export class NotDislikedPostError extends Error implements UseCaseError {
  constructor() {
    super('Not disliked this post')
  }
}
