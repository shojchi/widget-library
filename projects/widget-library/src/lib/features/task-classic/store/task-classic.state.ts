import { Task } from '../models';

/**
 * Task Classic Widget State
 * 
 * Manages the state for the Classic NgRx Task Widget implementation.
 */
export interface TaskClassicState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  selectedTaskId: string | null;
}

export const initialTaskClassicState: TaskClassicState = {
  tasks: [],
  loading: false,
  error: null,
  selectedTaskId: null
};
