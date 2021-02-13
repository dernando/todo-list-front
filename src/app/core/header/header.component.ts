import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from "../../models/task";

import { FormComponent } from '../../shared/task-form/form.component';
import { NoTaskFormComponent } from '../../shared/no-task-form/no-task-form.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  task:Task;

  constructor(
    public taskDialog: MatDialog,
    public noTaskDialog: MatDialog,

  ) {}

  openTaskDialog(): void {
    const dialogRef = this.taskDialog.open(FormComponent, {
      width: '400px'
    });    
  }

  openDialogNoTasks() {
    const dialogRef = this.noTaskDialog.open(NoTaskFormComponent, {
      width: '400px'
    });
  }
}