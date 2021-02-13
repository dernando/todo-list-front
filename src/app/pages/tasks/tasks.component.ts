import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';

import { FormComponent } from '../../shared/task-form/form.component';

import { Task, TasksStatus } from "../../models/task";
import { TasksService } from "../../services/tasks.service";

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
    public taskDialog: MatDialog
  ) {}

  ngOnInit(){
    this.taskService.getAll().subscribe(
      item => {
        this.pendingTasks = item.filter(item => item.status==TasksStatus.TasksStatusEnum.pending);
        this.finishedTasks = item.filter(item => item.status==TasksStatus.TasksStatusEnum.finished);
      },
      error => {
        console.log('error', error);
      }
    )
  }

  done = [
  ];

  drop(event: CdkDragDrop<string[]>) {
    console.log('event', event.container.data[0])
    console.log('event', event.previousContainer.data[0]['status'])
    let item = event.previousContainer.data[0];

    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

        this.updateTaskStatus(item);
    
    }
    /*else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }*/
  }

  openTaskDialog(item: Task): void {
    
    const dialogRef = this.taskDialog.open(FormComponent, {
      width: '400px',
      data: item
    });
  }

  updateTaskStatus(item) {

    item.status = 
      item.status === TasksStatus.TasksStatusEnum.pending ? 
                      TasksStatus.TasksStatusEnum.finished : 
                      TasksStatus.TasksStatusEnum.pending;

    this.taskService.update(item, item.id).subscribe(res => {
      console.log('res', res);
    },
    error => {
      console.log('error', error);
    })
  }

}
