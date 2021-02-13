import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Task, TasksStatus } from 'src/app/models/task';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  task:Task;

  taskForm = this.formBuilder.group({
    id: [null],
    owner:[null,[Validators.required]],
    email: [null,[Validators.required]],
    description: [null,[Validators.required]],
    status:[TasksStatus.TasksStatusEnum.pending],
    restartedTimes: [null]
  })

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TasksService,
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if(this.data && this.data.id) {
      this.fillFormValues();
    }
  }

  onSubmit() {
    if(!this.taskForm.invalid) {
      this.saveTask();
    }
  }

  fillFormValues() {
    this.taskForm.patchValue(this.data);
  }

  saveTask() {
    this.task = this.taskForm.value;
    console.log('task', this.task);
    let action;
    if(this.task.id){
      action = this .taskService.update(this.task, this.task.id);
    } else {
      action = this .taskService.create(this.task);
    }
    
    action.subscribe(
      res => {
        this.showResponseMessage("Task Salva com sucesso");        
      },
      error => {
        this.showResponseMessage("Erro ao salvar a task", "error");
      }
    )
  }

  showResponseMessage(message: string, type:string = "success") : void {
    this._snackBar.open(message, "", {
      duration: 2000,
      panelClass: [type]
    });
  }

}
