import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesServiceService {

  constructor() { }

  public messages : string[] = []
  
  add (message : string) : void {
    this.messages.push(message)
  }

  clear () : void {
    this.messages = []
  }

}
