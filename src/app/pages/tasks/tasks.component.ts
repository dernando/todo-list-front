import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

import { Task, TasksStatus } from "../../models/task";
import { TasksService } from "../../services/tasks.service";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit{

  tasks:Task[];
  todoTasks:Task[];

  constructor(
    private taskService: TasksService
  ) {}

  ngOnInit(){
    this.taskService.getAll().subscribe(
      item => {
        this.todoTasks = item.filter(item => item.status==TasksStatus.TasksStatusEnum.pending);
      },
      error => {
        console.log('error', error);
      }
    )
  }

  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  done = [
  ];

  drop(event: CdkDragDrop<string[]>) {
    console.log('oioio');
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  edit(item) {
    console.log('edit item', item);
  }

}
