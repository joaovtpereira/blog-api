import { UseCaseError } from '@/core/errors/type/use-case-errors'

export class AlreadyLikePostError extends Error implements UseCaseError {
  constructor() {
    super('Already like this post')
  }
}
