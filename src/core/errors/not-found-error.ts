import { UseCaseError } from '@/core/errors/type/use-case-errors'

export class NotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Post not found')
  }
}
