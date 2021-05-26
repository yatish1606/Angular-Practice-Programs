import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  public listTitle

  constructor(private taskService : TaskService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  public createNewList = (title: string) => {
    this.taskService
    .createList(title)
    .subscribe((response : any) => console.log(response))
  }

  public openDialog() : void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '30%',
      data:  {
        listTitle: this.listTitle
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      this.createNewList(result)
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
    @Inject(MAT_DIALOG_DATA) public data: {listTitle: string}) {}

  onNoClick(): void {
    this.dialogRef.close()
  }

}
