import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from "./base-resource.service";
import { Task } from "../models/task";
import { map, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TasksService extends BaseResourceService<Task>{

    private endpoint="task";
    public currentTasks: Observable<Task[]>;
    public currentTasksSubject = new BehaviorSubject<Task[]>(null);

    constructor(protected injector: Injector) {
        super("task", injector);
        this.currentTasks = this.currentTasksSubject.asObservable();
    }

    createMultiTasks(tasks: Task[]) {
        return this.http.post(`${this.baseUrlApi}/${this.endpoint}/multi`, tasks).pipe(map(response => response),catchError(err => err));
    }

    setCurrentTasks(tasks: Task[]) {
        this.currentTasksSubject.next(tasks);
    }

    appendTask(task: Task, id: number) {

        let currentTasks = this.currentTasksSubject.value;
        
        if(id) {
            currentTasks = currentTasks.map(item => item.id === id ? task : item);
        } else {
            currentTasks.push(task);
        } 
        this.setCurrentTasks(currentTasks);
    }

    appendMultiTask(tasks: Task[]) {
        let currentTasks = [...this.currentTasksSubject.value, ...tasks];
        this.setCurrentTasks(currentTasks);
    }

}