import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from "./base-resource.service";
import { Task } from "../models/task";
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TasksService extends BaseResourceService<Task>{

    private endpoint="task";

    constructor(protected injector: Injector) {
        super("task", injector);
    }

    createMultiTasks(tasks: Task[]) {
        return this.http.post(`${this.baseUrlApi}/${this.endpoint}/multi`, tasks).pipe(map(response => response),catchError(err => err));
    }

}