import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from '../question-base';
import { QuestionControlService } from '../question-control.service';


@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [ QuestionControlService ]
})
export class DynamicFormComponent implements OnInit {

  @Input() questions: QuestionBase<Array<string>>[] | null = [];
  form!: FormGroup;
  payLoad = '';

  constructor(private qcs: QuestionControlService) {}

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions as QuestionBase<Array<string>>[]);
  }

  onSubmit() {
    const formValues = this.form.getRawValue()
    const newPayload = {}
    let index = 0
    
    for ( const property in formValues) {
      
      const formProperty = Array.isArray(formValues[property]) ? formValues[property][0] : formValues[property]
      
      const valueArray = formProperty.trim().split(' ')
      const multiChoiceSelection : Array<{key:string, value: string}> = []
      
      if(valueArray.length > 1) {
        
        valueArray.forEach(selectedOption => {
          this.questions[index].options.forEach(({key, value}) => {
            if(selectedOption === value) 
              multiChoiceSelection.push({key, value})
          })
        })
      }

      newPayload[property] = valueArray.length > 1 ? multiChoiceSelection : valueArray[0]
      index++
    }
    
    this.payLoad = Object(newPayload)
  }
}