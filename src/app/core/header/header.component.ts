import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Task } from "../../models/task";

import { FormComponent } from '../../shared/task-form/form.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  task:Task;

  constructor(public taskDialog: MatDialog) {}

  openTaskDialog(): void {
    const dialogRef = this.taskDialog.open(FormComponent, {
      width: '400px'
    });    
  }
}
