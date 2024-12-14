import { UseCaseError } from '@/core/errors/type/use-case-errors'

export class NotAllowedError extends Error implements UseCaseError {
  constructor() {
    super('Not Allowed')
  }
}
