import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  public listTitle = ''
  public taskTitle = ''
  public lists: any[]
  public tasks: any[]

  constructor(private taskService : TaskService, private dialog: MatDialog, private router : ActivatedRoute, private navigation : Router) { }

  ngOnInit(): void {
    
    this.router.params.subscribe(
      (params : Params) => {
        this.taskService.getTasks(params.listID).subscribe((taskArray : any[]) => this.tasks = taskArray)
      }
    )

    this.taskService.getLists().subscribe((listArray : any[]) => this.lists = listArray)
  }

  public createNewList = (title: string) => {
    if(!title.length) return
    
    this.taskService
    .createList(title)
    .subscribe((response : any) => console.log(response))
  }


  // open modal to add new list or task
  public openDialog(type: string) : void {

    interface dataType {
      type: string, 
      listTitle ?: string, taskTitle ?: string
    }
    
    const data : dataType = { type }

    type === 'list' ? data.listTitle = this.listTitle : data.taskTitle = this.taskTitle

    const dialogRef = this.dialog.open(
      DialogComponent, 
      {
        width: '40%',
        data
      }
    )

    dialogRef.afterClosed().subscribe(result => {

      if(result.type === 'list')
        this.createNewList(result.listTitle)
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
    @Inject(MAT_DIALOG_DATA) public data: {listTitle: string, type?: string, taskTitle: string}) {}

  onNoClick(): void {
    this.dialogRef.close()
  }

}

