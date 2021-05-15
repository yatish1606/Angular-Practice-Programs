import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() public color : string 
  @Input() public iconSize : number

  @Output() iconClickEvent = new EventEmitter()

  public onClickIcon (e : MouseEvent) : void {
    console.log('from child', e)
    this.iconClickEvent.emit(e)
  }
}
