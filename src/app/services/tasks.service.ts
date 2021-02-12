import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from "./base-resource.service";
import { Tasks } from "../models/Tasks";

@Injectable({
    providedIn: 'root'
})
export class TasksService extends BaseResourceService<Tasks>{

    constructor(protected injector: Injector) {
        super("task", injector);
    }

}