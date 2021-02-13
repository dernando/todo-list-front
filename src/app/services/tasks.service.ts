import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from "./base-resource.service";
import { Task } from "../models/task";

@Injectable({
    providedIn: 'root'
})
export class TasksService extends BaseResourceService<Task>{

    constructor(protected injector: Injector) {
        super("task", injector);
    }

}