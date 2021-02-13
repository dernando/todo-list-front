export class Task {
    id: number;
    description: string;
    owner: string;
    status: TasksStatus.TasksStatusEnum;
    restartedTimes?: number;
}

export namespace TasksStatus {
    export type TasksStatusEnum = 'pending' | 'finished';
    export const TasksStatusEnum = {
        pending: 'pending' as TasksStatusEnum,
        finished: 'finished' as TasksStatusEnum
    };

}