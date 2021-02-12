export class Tasks {
    id: number;
    description: string;
    owner: string;
    status: TasksStatus.TasksStatusEnum;
}

export namespace TasksStatus {
    export type TasksStatusEnum = 'pending' | 'finished';
    export const TasksStatusEnum = {
        pending: 'pending' as TasksStatusEnum,
        finished: 'finished' as TasksStatusEnum
    };

}