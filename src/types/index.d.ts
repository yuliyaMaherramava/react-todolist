interface Task {
    id: string;
    name: string;
    columnId: string;
    createdAt: Date;
}

interface Column {
    id: string;
    name: string;
    tasks: Array<string>;
    order: number;
}

interface TaskById {
    [key: string]: Task;
}

interface ColumnById {
    [key: string]: Column;
}

interface ColumnState {
    byId: ColumnById;
    allIds: Array<string>;
}

interface TaskState {
    loading: boolean;
    error: Error | null;
    byId: TaskById;
    allIds: Array<string>;
}

interface StateType {
    columns: ColumnState;
    tasks: TaskState;
}

interface DropTaskPayload {
    destionationId: string;
    sourceId: string;
    draggableId: string;
}
