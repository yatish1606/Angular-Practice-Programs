import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from '../question-base';


@Component({
  selector: 'app-question',
  templateUrl: './dynamic-form-question.component.html'
})
export class DynamicFormQuestionComponent {
  @Input() question!: QuestionBase<Array<string>>;
  @Input() form!: FormGroup;
  get isValid() { return this.form.controls[this.question.key].valid; }

  ngOnInit () {
    console.log(this.question)
  }

  public checkBoxChange (event : Event, opt: any ) : void {
    let old = this.form.value.Languages
    let input = document.getElementById(`checkbox${opt.key}`) as HTMLInputElement
    this.form.patchValue({
      Languages: input.checked ?  old.concat(' ').concat(opt.value) : old.replace(opt.value, '')
    })
    console.log(this.form)
  }

}