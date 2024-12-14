import { UseCaseError } from '@/core/errors/type/use-case-errors'

export class UserWithSameEmail extends Error implements UseCaseError {
  constructor() {
    super('Already exists a user with same email')
  }
}
