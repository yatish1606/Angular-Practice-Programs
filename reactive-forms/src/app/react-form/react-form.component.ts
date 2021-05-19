import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-react-form',
  templateUrl: './react-form.component.html',
  styleUrls: ['./react-form.component.css']
})
export class ReactFormComponent implements OnInit {

  constructor(private formBuilder : FormBuilder) { }

  public name = new FormControl('')
  public profileForm = new FormGroup({
    firstName : new FormControl(''),
    lastName : new FormControl(''),
    address : new FormGroup({
      street : new FormControl(''),
      city : new FormControl(''),
      state : new FormControl(''),
      zip : new FormControl('')
    })
  })

  public profileFormWithBuilder = this.formBuilder.group({
    firstName : '',
    lastName : ['', Validators.required], // if last name needs validation then second array item
    address : this.formBuilder.group({
      street : '',
      city : '',
      state : '',
      zip : ''
    }),
    aliases : this.formBuilder.array([
      this.formBuilder.control('')
    ])

  })

  ngOnInit() : void {
  }

  get aliases() {
    return this.profileFormWithBuilder.get('aliases') as FormArray;
  }

  public changeName () : void {
    this.name.setValue('New name')
  }

  public onSubmit () : void {
    console.log('Form submitted with ' + this.profileFormWithBuilder.value.address.street)
  }

  public updateProfile () : void {
    this.profileFormWithBuilder.patchValue({
      lastName: 'Kelkar',
      address : {
        street: 'Shivtirthnagar',
        zip : '411038'
      }
    })
  }

  public addAlias () : void {
    this.aliases.push(this.formBuilder.control(''))
  }

}
