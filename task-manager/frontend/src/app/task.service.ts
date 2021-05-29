import { Injectable } from '@angular/core';
import { Task } from './models/index.model';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webRequestService : WebRequestService) { }

  public createList = (title: string) => {
    return this.webRequestService.post(
      'lists',
      { title }
    )
  }

  public createTask = (title: string, _listID: string) => {
    return this.webRequestService.post(
      `lists/${_listID}/tasks`,
      { title, _listID }
    )
  }

  public getLists = () => {
    return this.webRequestService.get('lists')
  }

  public getTasks = (listID: string) => {
    return this.webRequestService.get(`lists/${listID}/tasks`)
  }

  public markAsComplete = (task : Task) => {
    return this.webRequestService.patch(
      `lists/${task._listID}/tasks/${task._id}`,
      {
        completed: true
      }
    )
  }
}
