export const LoadingStates = Object.freeze({
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
  EMPTY: 'empty',
  NOT_FOUND: 'not-found',
});

export type LoadingState = typeof LoadingStates[keyof typeof LoadingStates];