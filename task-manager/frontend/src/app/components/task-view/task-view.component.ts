import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { List, Task } from 'src/app/models/index.model';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  public title ?: string = ''
  public lists : Array<List>[]
  public tasks : Array<Task>[]
  public currentListID : string | null = null

  constructor(private taskService : TaskService, private dialog: MatDialog, private router : ActivatedRoute, private navigation : Router) { }

  ngOnInit(): void {
    
    this.router.params.subscribe(
      (params : Params) => {
        this.currentListID = params.listID
        this.taskService
        .getTasks(params.listID)
        .subscribe((taskArray : any[]) => this.tasks = taskArray)
      }
    )

    this.taskService
    .getLists()
    .subscribe((listArray : Array<List>[]) => this.lists = listArray)
  }


  // create a new list and navigate to it
  public createNewList = (title: string) : void => {
    if(!title.length) return

    this.taskService
    .createList(title)
    .subscribe((response : List) => this.navigation.navigate(['/lists', response._id]))
  }


  // create a new task
  public createNewTask = (title: string, _listID: string = this.currentListID) : void => {
    console.log('creating a new task with listid', _listID)
    if(!title.length) return

    this.taskService
    .createTask(title, _listID)
    .subscribe((response : Task) => console.log('created a new task with credentials as ', response))
  }


  // open modal to add new list or task
  public openDialog(type: string) : void {

    interface dataType {
      type: string, 
      title: string
    }
    
    const data : dataType = { type, title: this.title }

    const dialogRef = this.dialog.open(
      DialogComponent, 
      {
        width: '40%',
        data
      }
    )

    dialogRef.afterClosed().subscribe(result => {
      console.log('resilt is ', result)
      if(result.type === 'list')
        this.createNewList(result.title)
      else this.createNewTask(result.title)

      //window.location.reload()
    })
  }


  // mark task as completed 
  public onTaskClick = (task : Task) : void => {

    this.taskService
    .markAsComplete(task)
    .subscribe(() => {
      console.log('task completed')
      task.completed = !task.completed
    })
  }

}



@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
})
export class DialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {title: string, type?: string}) {}

  onNoClick(): void {
    this.dialogRef.close()
  }

}

