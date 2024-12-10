import { Either, left, right } from './either'

function testFunction(isSuccess: boolean): Either<string, boolean> {
  if (isSuccess) {
    return right(true)
  }
  return left('error')
}

describe('Either class test', () => {
  it('should be able to create a success result', () => {
    const result = testFunction(true)
    expect(result.isRight()).toBe(true)
    expect(result.isLeft()).toBe(false)
  })
  it('should be able to create a error response', () => {
    const result = testFunction(false)
    expect(result.isRight()).toBe(false)
    expect(result.isLeft()).toBe(true)
  })
})
