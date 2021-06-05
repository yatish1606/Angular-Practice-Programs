import { Component } from '@angular/core';

import { QuestionService } from './questionnaire/question.service';
import { QuestionBase } from './questionnaire/question-base';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <div class="mat-typography">
      <h1>Dynamic Questionnaire</h1>
      <app-dynamic-form></app-dynamic-form>
    </div>
  `,
  providers:  [QuestionService]
})
export class AppComponent {
  questions$: any;

  constructor(service: QuestionService) {
    this.questions$ = service.getQuestions()
    console.log(this.questions$, this.questions$ instanceof Array, this.questions$.length)
  }
}