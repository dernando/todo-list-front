import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { TasksComponent } from './tasks.component';

const routes: Routes = [{
  path: "",
  component: TasksComponent
}];


@NgModule({
  declarations: [TasksComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DragDropModule
  ]
})
export class TasksModule { }
