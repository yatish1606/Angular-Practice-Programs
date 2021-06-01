import { QuestionBase } from './question-base'

export class RadioQuestion extends QuestionBase<Array<string>> {
  controlType = 'radio'
}