import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly BASE_URL = 'http://localhost:3000'

  constructor(private httpClient: HttpClient) { }

  public get = (URI: string) => this.httpClient.get(`${this.BASE_URL}/${URI}`)

  public post = (URI: string, payload: Object) => {
    return this.httpClient.post(
      `${this.BASE_URL}/${URI}`,
      payload
    )
  }

  public patch = (URI: string, payload: Object) => {
    return this.httpClient.patch(
      `${this.BASE_URL}/${URI}`,
      payload
    )
  }

  public delete = (URI: string) => this.httpClient.delete(`${this.BASE_URL}/${URI}`)
}
