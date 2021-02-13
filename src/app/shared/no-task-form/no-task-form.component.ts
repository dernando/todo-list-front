import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Task, TasksStatus } from '../../models/task';
import { TasksService } from '../../services/tasks.service';
import { animalFactsService } from "../../services/animal-facts.service";

@Component({
  selector: 'app-no-task-form',
  templateUrl: './no-task-form.component.html',
  styleUrls: ['./no-task-form.component.scss']
})
export class NoTaskFormComponent {

  tasks:Task[];
  animalFacts = {};

  constructor(
    private animalFactsService: animalFactsService,
    private tasksService: TasksService,
    public dialogRef: MatDialogRef<NoTaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  generateRandomTasks() {
    this.animalFactsService.getFacts().subscribe(res => {
      this.animalFacts = res;
      this.setNewtasks();
    },
    error => {
      console.log('error', error);
    })
  }

  setNewtasks() {
    const tasks = [];
    console.log('animalFacts', this.animalFacts);
    Object.entries(this.animalFacts).forEach(([key, item]) => {
      console.log('item', key, item);
      tasks.push({
        owner: "Eu",
        email: "eu@me.com",
        description: item['text']
      })
    })
    this.tasks = tasks;

    this.saveTasks();
  }

  saveTasks() {
    this.tasksService.createMultiTasks(this.tasks).subscribe(res => {
      this.tasks = [];
    },
    error => {
      console.log('error', error);
    })
  }

}
