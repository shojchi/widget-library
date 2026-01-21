export interface LoadingProcess {
  id: string;
  message: string;
}

export interface LoadingState {
  activeOperations: LoadingProcess[];
  startedAt: number | null;
  delayBeforeSpinner: number;
}

export const initialLoadingState: LoadingState = {
  activeOperations: [],
  startedAt: null,
  delayBeforeSpinner: 150
};
