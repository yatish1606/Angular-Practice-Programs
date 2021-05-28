import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webRequestService : WebRequestService) { }

  public createList = (title: string) => {
    return this.webRequestService.post(
      'lists',
      {title}
    )
  }

  public getLists = () => {
    return this.webRequestService.get('lists')
  }

  public getTasks = (listID: string) => {
    return this.webRequestService.get(`lists/${listID}/tasks`)
  }
}
