import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionBase } from '../question-base';
import { CheckBoxQuestion } from '../question-checkbox';
import { DropdownQuestion } from '../question-dropdown';
import { RadioQuestion } from '../question-radio';
import { TextboxQuestion } from '../question-textbox';
import { QuestionService } from '../question.service';


@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [ QuestionService ]
})
export class DynamicFormComponent implements OnInit {

  public questions 
  public typeQuestions : QuestionBase<string>[] = []
  public form!: FormGroup | null;
  public payLoad = '';

  constructor(ser: QuestionService) {
    ser.getQuestions().subscribe(r =>{
      this.questions = r
      this.changeToGroup()
    })
  }

  ngOnInit() {}

  public changeToGroup () {

    this.questions.forEach(question => {
          
          let newQues : any
          
          switch(question.answerType) {
            
            case 'text' :
              
              newQues = new TextboxQuestion({
                key: question.id.toString(),
                label: question.questionDescription,
                value: '',
                required: question.isMandatory,
                order: question.orderNumber,
                type: question.answerType
              })
              break
            
            case 'dropdown' : 
              
              const newOptionsDropdown = question.optionsDescription.map((desc, index) => {
                return {key: index.toString(), value: desc}
              })
    
              newQues = new DropdownQuestion({
                key: question.id.toString(),
                label: question.questionDescription,
                options: newOptionsDropdown,
                required: question.isMandatory,
                order: question.orderNumber,
                type: question.answerType
              })
              break
    
            case 'checkbox' : 
    
              const newOptionsCheckbox = question.optionsDescription.map((desc, index) => {
                return {key: index.toString(), value: desc}
              })
    
              newQues = new CheckBoxQuestion({
                key: question.id.toString(),
                label: question.questionDescription,
                options: newOptionsCheckbox,
                required: question.isMandatory,
                order: question.orderNumber,
                type: question.answerType
              })
              break
    
            case 'radio' : 
    
              const newOptionsRadio = question.optionsDescription.map((desc, index) => {
                return {key: index.toString(), value: desc}
              })
    
              newQues = new RadioQuestion({
                key: question.id.toString(),
                label: question.questionDescription,
                options: newOptionsRadio,
                required: question.isMandatory,
                order: question.orderNumber,
                type: question.answerType
              })
              break
          }
          
          this.typeQuestions.push({...newQues})
    
    })

    let group: any = {}
    this.typeQuestions.forEach(question => {
      
      group[parseInt(question.key.toString())] = question.required ? new FormControl(question.value || '', Validators.required)
                                                         : new FormControl(question.value || '')
    })
    
    this.form = new FormGroup(group)
    
  }

  public getErrorMessage() {
    return 'This field is required'
  }

  onSubmit(submitEvent : Event) {
    
    submitEvent.preventDefault()
    console.log(this.form)
    this.payLoad = this.form.value
    
  }
}