import { QuestionBase } from './question-base'

export class CheckBoxQuestion extends QuestionBase<Array<string>> {
  controlType = 'checkbox'
}