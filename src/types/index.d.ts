type TaskType = {
    id: string;
    name: string;
    columnId: string;
    createdAt: Date;
};

type ColumnType = {
    id: string;
    name: string;
    tasks: Array<string>;
    propertyOrder: number;
};

export type StateType = {
    columns: {
        byId: {
            [key: string]: ColumnType;
        };
        allIds: Array<string>;
    };
    tasks: {
        byId: {
            [key: string]: TaskType;
        };
        allIds: Array<string>;
    };
};
