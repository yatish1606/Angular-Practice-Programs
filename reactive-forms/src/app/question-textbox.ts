import { QuestionBase } from './question-base'

export class TextboxQuestion extends QuestionBase<Array<string>> {
  controlType = 'textbox'
}