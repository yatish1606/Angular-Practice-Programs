import { Component } from '@angular/core';

import { QuestionService } from './question.service';
import { QuestionBase } from './question-base';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <div class="mat-typography">
      <h1>Dynamic Questionnaire</h1>
      <app-dynamic-form [questions]="questions$"></app-dynamic-form>
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