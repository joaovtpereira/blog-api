import { Optional } from '@/core/types/optional'
import { UniquieEntityId } from '@/core/entities/uniquie-entity-id'
import { Response, ResponseProps } from './response'

export interface ResponseAnswerProps extends ResponseProps {
  answerId: UniquieEntityId
}

export class ResponseAnswer extends Response<ResponseAnswerProps> {
  get answerId() {
    return this.props.answerId
  }

  static create(
    props: Optional<ResponseAnswerProps, 'createdAt'>,
    id?: UniquieEntityId,
  ) {
    const answer = new ResponseAnswer(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return answer
  }
}
