import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';

import { FormComponent } from '../../shared/task-form/form.component';
import { ValidationFormComponent } from './validation-form/validation-form.component';

import { Task, TasksStatus } from "../../models/task";
import { TasksService } from "../../services/tasks.service";
import { ValidatorService } from "../../services/validator.service";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit{

  tasks:Task[];
  pendingTasks:Task[];
  finishedTasks:Task[];

  constructor(
    private taskService: TasksService,
    private ValidatorService: ValidatorService,
    public taskDialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(){
    this.taskService.getAll().subscribe(
      item => {
        this.setTasksList(item);
       },
      error => {
      }
    )
  }

  setTasksList(tasks:Task[]) {
    this.tasks = tasks;      
    this.pendingTasks = this.tasks.filter(item => item.status==TasksStatus.TasksStatusEnum.pending);
    this.finishedTasks = this.tasks.filter(item => item.status==TasksStatus.TasksStatusEnum.finished);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer !== event.container) {

      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
        
        const task = event['container']['data'][event.currentIndex];
      
        if(event.previousContainer.id==="cdk-drop-list-1") {
          this.requestAuthorizationMovement(task);
          return;
        }

        this.updateTaskStatus(task);
    }
  }

  openTaskDialog(item: Task): void {
    
    const dialogRef = this.taskDialog.open(FormComponent, {
      width: '400px',
      data: item
    });
  }

  requestAuthorizationMovement(task) {
    const dialogRef = this.taskDialog.open(ValidationFormComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.ValidatorService.validatePassword(result)) {
        this.updateTaskStatus(task);
      } else {
        this.showError("Você não pode efetuar esse movimento.");
        this.setTasksList(this.tasks);      
      }
      
    });
  }

  updateTaskStatus(item) {

    item.status = 
      item.status === TasksStatus.TasksStatusEnum.pending ? 
                      TasksStatus.TasksStatusEnum.finished : 
                      TasksStatus.TasksStatusEnum.pending;

    if(item.status === TasksStatus.TasksStatusEnum.pending) {
      item.restartedTimes++;
    } 

    this.taskService.update(item, item.id).subscribe(res => {
      
      //this.setTasksList(this.tasks);

    },
    error => {
      this.showError("Ops, Houve erro ao movimentar sua tarefa.");
    })
  }

  showError(message) {
    this._snackBar.open(message, "", {
      duration: 2000,
      panelClass: ["error"]
    });
  }

}
