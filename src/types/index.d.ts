interface Task {
    _id: string;
    name: string;
    order: number;
    columnId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

interface Column {
    _id: string;
    tasks?: Array<Task>;
    name: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
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
    loading: boolean;
    error: Error | null;
}
interface ByColumnState {
    [key: string]: Array<string>;
}

interface TaskState {
    loading: boolean;
    error: Error | null;
    byId: TaskById;
    byColumn: ByColumnState;
}
interface StateType {
    columns: ColumnState;
    tasks: TaskState;
}

interface DropTaskPayload {
    id: string;
    destinationId: string;
    sourceId: string;
    sourceOrder: number;
    destinationOrder: number;
}
interface DeleteTaskPayload {
    id: string;
    columnId: string;
}

interface UpdateTaskPayload {
    id: string;
    name: string;
}

interface UpdateColumnPayload {
    id: string;
    text: string;
}

interface DeleteColumnPayload {
    id: string;
}
