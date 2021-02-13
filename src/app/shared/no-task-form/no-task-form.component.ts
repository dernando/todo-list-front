import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Task } from '../../models/task';
import { TasksService } from '../../services/tasks.service';
import { animalFactsService } from "../../services/animal-facts.service";
import { SnackBarService } from "../../services/snackbar.service";

@Component({
  selector: 'app-no-task-form',
  templateUrl: './no-task-form.component.html',
  styleUrls: ['./no-task-form.component.scss']
})
export class NoTaskFormComponent {

  private tasks:Task[];
  private animalFacts = {};
  private ownerActivity= {
    owner:"Eu",
    email:"eu@me.com"
  }


  constructor(
    private animalFactsService: animalFactsService,
    private tasksService: TasksService,
    public dialogRef: MatDialogRef<NoTaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit(): void {
  }

  generateRandomTasks() {
    this.animalFactsService.getFacts().subscribe(res => {
      this.animalFacts = res;
      this.setNewtasks();
    },
    error => {
      this.snackBarService.showErrorMessage("Tivemos um probleminha ao gerar suas atividades");
    })
  }

  setNewtasks() {
    const tasks = [];
    
    Object.entries(this.animalFacts).forEach(([key, item]) => {
      tasks.push({
        owner: this.ownerActivity.owner,
        email: this.ownerActivity.email,
        description: item['text']
      })
    })
    this.tasks = tasks;

    this.saveTasks();
  }

  saveTasks() {
    this.tasksService.createMultiTasks(this.tasks).subscribe(res => {
      
      this.tasksService.appendMultiTask(this.tasks);
      
      this.tasks = [];
      this.snackBarService.showSuccessMessage("Atividades criadas com sucesso!");
      this.dialogRef.close();
    },
    error => {
      this.snackBarService.showErrorMessage("Opa, tivemos um problema ao adicionar suas atividades!");
    })
  }
}