export type TaskType = {
    id: number;
    name: string;
}

export type PropsType = {
    name: string;
    tasks: Array<TaskType>;
}
