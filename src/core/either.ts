export class Left<Error, Success> {
  readonly value: Error

  constructor(value: Error) {
    this.value = value
  }

  isRight(): this is Right<Error, Success> {
    return false
  }

  isLeft(): this is Left<Error, Success> {
    return true
  }
}

export class Right<Error, Success> {
  readonly value: Success

  constructor(value: Success) {
    this.value = value
  }

  isRight(): this is Right<Error, Success> {
    return true
  }

  isLeft(): this is Left<Error, Success> {
    return false
  }
}

export type Either<Error, Success> =
  | Left<Error, Success>
  | Right<Error, Success>

export const left = <Error, Success>(value: Error): Either<Error, Success> => {
  return new Left(value)
}

export const right = <Error, Success>(
  value: Success,
): Either<Error, Success> => {
  return new Right(value)
}
