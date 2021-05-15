import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public routes = [
    {
      id: 1,
      title: 'one page'
    },
    {
      id: 2,
      title: 'two page'
    },
    {
      id: 3,
      title: 'three page'
    },
    {
      id: 4,
      title: 'four page'
    },
  ]
  
  title = '';

  constructor(private router : Router) {

  }

  public onClick (route) : void {
    this.router.navigate(['/path', route.id])
  }
}
