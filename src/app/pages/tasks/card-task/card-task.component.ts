import { Component, Input, OnInit } from '@angular/core';
import { Task } from "../../../models/task";
@Component({
  selector: 'app-card-task',
  templateUrl: './card-task.component.html',
  styleUrls: ['./card-task.component.scss']
})
export class CardTaskComponent {

  @Input('item') item: Task;

  constructor() { }

}
