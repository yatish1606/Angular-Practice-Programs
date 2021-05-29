import { Component, OnInit } from '@angular/core';
import { APP_NAME } from 'src/global';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public appName = APP_NAME
  public username: string = ''
  public password: string = ''
  
  constructor() { }

  ngOnInit(): void {
  }

}
