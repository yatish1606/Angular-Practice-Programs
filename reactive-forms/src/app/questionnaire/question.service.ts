import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class QuestionService {

  public clinicID : string | null = ''
  public fetchedQuestions !: any

  constructor(private http: HttpClient) {}

  public getQuestions() {

        return this.http.get(
          `http://localhost:8080/api/getQuestions`, {
            params: new HttpParams().set('clinicId' , '1')
          }
        ) 
      }
}