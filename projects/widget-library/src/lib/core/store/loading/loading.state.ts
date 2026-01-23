export interface LoadingProcess {
  operationName: string;
  message?: string;
}

export interface LoadingState {
  operations: Record<string, LoadingProcess>;
  delayBeforeSpinner: number;
}

export const initialLoadingState: LoadingState = {
  operations: {},
  delayBeforeSpinner: 150
};
