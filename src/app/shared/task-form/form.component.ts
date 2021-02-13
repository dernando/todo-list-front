import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
    owner:[null,[Validators.required]],
    email: [null,[Validators.required]],
    description: [null,[Validators.required]],
    status:[TasksStatus.TasksStatusEnum.pending],
    restartedTimes: [null]
  })

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TasksService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if(!this.taskForm.invalid) {
      this.saveTask();
    }
  }

  saveTask() {
    this.task = this.taskForm.value;
    
    this
      .taskService
      .create(this.task)
      .subscribe(
        res => {
          console.log('res', res); 
          },
      error => {
        console.log('error', error);
      }
    )
  }

}
