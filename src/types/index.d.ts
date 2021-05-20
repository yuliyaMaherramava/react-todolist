export type TaskType = {
    id: string;
    name: string;
    columnId: string;
    createdAt: Date;
};

type ColumnType = {
    id: string;
    name: string;
    tasks: Array<string>;
    order: number;
};

export type ColumnStateType = {
    byId: {
        [key: string]: ColumnType;
    }
    allIds: Array<string>;
};

export type TaskStateType = {
    byId: {
        [key: string]: TaskType ;
    }
    allIds: Array<string>;
};

export type StateType = {
    columns: ColumnStateType;
    tasks: TaskStateType;
};
