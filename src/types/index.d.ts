interface TaskType {
    id: string;
    name: string;
    columnId: string;
    createdAt: Date;
}

interface ColumnType {
    id: string;
    name: string;
    tasks: Array<string>;
    order: number;
}

interface ColumnStateType {
    byId: {
        [key: string]: ColumnType;
    };
    allIds: Array<string>;
}

interface TaskStateType {
    byId: {
        [key: string]: TaskType;
    };
    allIds: Array<string>;
}

interface StateType {
    columns: ColumnStateType;
    tasks: TaskStateType;
}
