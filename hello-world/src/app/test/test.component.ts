import { Component, Input, OnInit, Output, EventEmitter, SimpleChange } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { iconSizeLarge, iconSizeMedium } from '../global';
import { Resource } from '../interfaces';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  public name = 'Yatish'
  public window = window
  public isDisabled = false
  public isokay = false
  public isItalic = true
  public text = ' '
  public color = '#434343'
  public iconSize = iconSizeLarge
  public employees : Resource[]
  public id = '0'
  
  @Output() public childEvent = new EventEmitter()
  

  constructor(private _employees : EmployeeService, private route : ActivatedRoute) { }

  ngOnInit() : void {

    this._employees.getEmployees()
      .subscribe(
        data => this.employees = data, // success
        err => console.log(err), // fail 
        () => console.log('fetched data') // finally
      )
    
    //this.id = this.route.snapshot.paramMap.get('id')

    this.route.paramMap.subscribe((params : ParamMap) => {
      this.id = params.get('id')
    })
  }

  ngOnChanges(changes : SimpleChange) : void {

  }

  public greetUser() : string {
    return 'hello'.concat(this.name)
  }

  classObj : Object = {
    'okay': this.isokay,
    'danger': !this.isokay,
    'italic': this.isItalic
  }

  public onClick(refVar : HTMLElement) : void {
    console.log(this.text)
    this.text = refVar.innerHTML
    this.isDisabled = !this.isDisabled
    this.childEvent.emit('Message from child')
  }

  public onClickIcon(e : MouseEvent) : void {
    console.log('icon clicked')
  }

  @Input('parentMessage') public parentData : string
  
  public onIconClick(e : MouseEvent): void {
    console.log('from parent', e)
  }

}
