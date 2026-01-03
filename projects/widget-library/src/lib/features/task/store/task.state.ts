import { TaskData } from "../../../../../../../mocks/interfaces";

export interface TaskState {
  tasks: TaskData[];
  loading: boolean;
  error: string | null;
  selectedTask: TaskData | null;
}

export const initialState: TaskState = {
    tasks: [],
    loading: false,
    error: null,
    selectedTask: null
}