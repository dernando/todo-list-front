import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { TasksComponent } from './tasks.component';
import { CardTaskComponent } from './card-task/card-task.component';
import { ValidationFormComponent } from './validation-form/validation-form.component';

const routes: Routes = [{
  path: "",
  component: TasksComponent
}];


@NgModule({
  declarations: [TasksComponent, CardTaskComponent, ValidationFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class TasksModule { }
