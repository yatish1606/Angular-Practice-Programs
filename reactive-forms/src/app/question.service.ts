import { Injectable } from '@angular/core';

import { DropdownQuestion } from './question-dropdown';
import { QuestionBase } from './question-base';
import { TextboxQuestion } from './question-textbox';
import { of } from 'rxjs';
import { CheckBoxQuestion } from './question-checkbox';
import { RadioQuestion } from './question-radio';

@Injectable()
export class QuestionService {

  public getQuestions() {

    const questions: QuestionBase<Array<string>>[] = [

      new DropdownQuestion({
        key: 'brave',
        label: 'Bravery Rating',
        options: [
          {key: 'solid',  value: 'Solid'},
          {key: 'great',  value: 'Great'},
          {key: 'good',   value: 'Good'},
          {key: 'unproven', value: 'Unproven'}
        ],
        order: 3
      }),

      new TextboxQuestion({
        key: 'firstName',
        label: 'First name',
        value: ['Bombasto'],
        required: true,
        order: 1,
        type: 'text'
      }),

      new TextboxQuestion({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        order: 2,
        value: ['']
      }),

      new CheckBoxQuestion({
        key: 'Languages',
        label: 'Languages',
        type: 'checkbox',
        options: [
          {key: '0', value: 'English'},
          {key: '1', value: 'Hindi'},
          {key: '2', value: 'Marathi'},
        ],
        order: 4
      }),

      new RadioQuestion({
        key: 'Country',
        label: 'Country',
        type: 'radio',
        options: [
          {key: '0', value: 'USA'},
          {key: '1', value: 'Britain'},
          {key: '2', value: 'India'},
        ],
        order: 5
      })
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }
}