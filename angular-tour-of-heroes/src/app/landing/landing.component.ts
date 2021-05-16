import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private route : ActivatedRoute) { }

  public params = []

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      Object.keys(params)
      .forEach(key => this.params.push({
        key,
        value: params[key]
      }))
    })
  }

}
