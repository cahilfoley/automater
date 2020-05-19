import { Step } from './internal/Step'

export enum StepChangeType {
  Starting = 'Starting',
  Complete = 'Complete',
  Failed = 'Failed',
}

export interface StepStartingPayload<T> {
  step: Step<T>
}

export interface StepCompletePayload<T> {
  step: Step<T>
  result: any
}

export interface StepFailedPayload<T> {
  step: Step<T>
  error: Error
}

export interface StepEventMap<T> {
  STEP_STARTING: StepStartingPayload<T>
  STEP_COMPLETE: StepCompletePayload<T>
  STEP_FAILED: StepFailedPayload<T>
}
