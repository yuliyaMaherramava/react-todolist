interface Task {
    id: string;
    name: string;
    order: number;
    columnId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
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
    loading: boolean;
    error: Error | null;
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
    id: string;
    destinationId: string;
    sourceId: string;
    order: number;
}
interface DeleteTaskPayload {
    id: string;
    columnId: string;
}

interface UpdateTaskPayload {
    id: string;
    taskText: string;
}

interface UpdateColumnPayload {
    id: string;
    text: string;
}
