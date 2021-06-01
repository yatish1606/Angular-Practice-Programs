import { QuestionBase } from './question-base'

export class DropdownQuestion extends QuestionBase<Array<string>> {
  controlType = 'dropdown'
}