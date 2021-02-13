import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Task, TasksStatus } from '../../models/task';
import { TasksService } from '../../services/tasks.service';
import { EmailLayerService } from '../../services/email-layer.service';

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
  });

  showEmailAlert: boolean;
  emailSuggestion: string;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TasksService,    
    private emailLayerService: EmailLayerService,
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
      this.emailLayerService.checkEmail(this.taskForm.value.email).subscribe(
        res => {
          
          if(res['did_you_mean']) {
            this.emailSuggestion = res['did_you_mean'];
          }

          if(!res['smtp_check']) {
            this.showEmailAlert = true;
            return;
          }
          
          this.saveTask();

        },
        error => {
          console.log('error', error);
        }
      );
      //this.saveTask();
    }
  }

  fillFormValues() {
    this.taskForm.patchValue(this.data);
  }

  saveTask() {
    this.task = this.taskForm.value;
    let action;
    const taskId = this.task.id ? this.task.id : null
    
    if(taskId){
      action = this.taskService.update(this.task, taskId);
    } else {
      action = this.taskService.create(this.task);
    }
    
    action.subscribe(
      res => {
        this.task.id = taskId ? taskId : res['id'];
        this.taskService.appendTask(this.task, taskId);
        
        this.showResponseMessage("Task Salva com sucesso");
        this.dialogRef.close(false);
      
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
