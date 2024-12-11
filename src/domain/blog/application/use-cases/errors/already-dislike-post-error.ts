import { UseCaseError } from '@/core/errors/use-case-errors'

export class AlreadyDislikePostError extends Error implements UseCaseError {
  constructor() {
    super('Already dislike this post')
  }
}
