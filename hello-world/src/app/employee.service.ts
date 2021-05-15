import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resource } from './interfaces';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http : HttpClient) { }

  public employees = [
    {
      name: 'John Doe',
      age: 23
    },
    {
      name: 'Jane Doe',
      age: 25
    }
  ]

  public getEmployees () : Observable<Resource[]> {
    return this.http.get<Resource[]>('https://jsonplaceholder.typicode.com/posts')
  }
}
