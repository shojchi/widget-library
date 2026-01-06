import { TaskData } from '../models/task.model';

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
};
