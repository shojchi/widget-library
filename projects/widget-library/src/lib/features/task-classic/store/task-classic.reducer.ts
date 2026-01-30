import { createReducer, on } from '@ngrx/store';
import { initialTaskClassicState } from './task-classic.state';
import { TaskClassicActions } from './task-classic.actions';

export const taskClassicReducer = createReducer(
  initialTaskClassicState,

  // Load tasks
  on(TaskClassicActions.loadTasks, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TaskClassicActions.loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks,
    loading: false,
    error: null
  })),
  on(TaskClassicActions.loadTasksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Create task
  on(TaskClassicActions.createTask, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TaskClassicActions.createTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task],
    loading: false,
    error: null
  })),
  on(TaskClassicActions.createTaskFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Update task
  on(TaskClassicActions.updateTask, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TaskClassicActions.updateTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map(t => (t.id === task.id ? task : t)),
    loading: false,
    error: null
  })),
  on(TaskClassicActions.updateTaskFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Delete task
  on(TaskClassicActions.deleteTask, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TaskClassicActions.deleteTaskSuccess, (state, { id }) => ({
    ...state,
    loading: false,
    error: null,
    tasks: state.tasks.filter(t => t.id !== id)
  })),
  on(TaskClassicActions.deleteTaskFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Select task
  on(TaskClassicActions.selectTask, (state, { id }) => ({
    ...state,
    selectedTaskId: id
  })),
  on(TaskClassicActions.clearSelectedTask, state => ({
    ...state,
    selectedTaskId: null
  })),

  // Clear errors
  on(TaskClassicActions.clearErrors, state => ({
    ...state,
    error: null
  }))
);
