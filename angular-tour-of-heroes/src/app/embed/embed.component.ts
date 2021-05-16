import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-embed',
  templateUrl: './embed.component.html',
  styleUrls: ['./embed.component.css']
})
export class EmbedComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  public navigate () : void {
    this.router.navigate(['/landing'], {queryParams: {
      clinicId: 1,
      Source: 'Facebook'
    }})
  }

}
