import { randomUUID } from 'node:crypto'

export class UniquieEntityId {
  private value: string

  public getValue() {
    return this.value
  }

  public toValue() {
    return this.value
  }

  constructor(value?: string) {
    this.value = value ?? randomUUID()
  }
}
