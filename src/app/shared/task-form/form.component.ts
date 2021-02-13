import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TasksStatus } from 'src/app/models/task';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  taskForm = this.formBuilder.group({
    owner:[null,[Validators.required]],
    email: [null,[Validators.required]],
    description: [null,[Validators.required]],
    status:[null],
    restartedTimes: [null]
  })

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('submit');
  }

}
