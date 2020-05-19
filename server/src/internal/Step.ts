import { StepEventMap, StepChangeType } from '../events'
import { TypedEmitter } from './TypedEmitter'
import { pubsub } from '../graphql'

export interface ParamSchema {
  /** Disabled the field, making it greyed out */
  disabled: boolean
  /** The type of field to display */
  type?:
    | 'date'
    | 'boolean'
    | 'number'
    | 'password'
    | 'select'
    | 'multi-select'
    | 'text'
  /** The key of the property, used to create a label if not provided and used as a unique ID */
  id: string
  /** The label to display for the field, will convert the key to title case if not provided */
  label?: string
  /** If the field type is `text` this boolean will show a textarea instead, otherwise it is ignored */
  multiline?: boolean
  /** Only used if the field type is `text` and the `multiline` flag is true, used to modify the height of the textarea */
  rows?: number
  /** Number of milliseconds to debounce the handleChange function call. Only applicable for text type */
  debounce?: number
  /** The current value of the field */
  value?: any
  /** Required if the field is of type `select`, provides a map of values to display names */
  options?: Record<string, string>
  /** Simply adds an asterisk next to the label, use with validation to properly implement a required field */
  required?: boolean
  /** Optional helper text to be displayed beneath the field */
  helperText?: string
}

interface StepExecutorUtilities<T> {
  stream: TypedEmitter<StepEventMap<T>>
}

type StepExecutor<T> = (
  this: Step<T>,
  params: T,
  utils: StepExecutorUtilities<T>
) => Promise<void>

export enum StepStatus {
  Ready = 'Ready',
  Running = 'Running',
}

interface StepOptions<T> {
  id: string
  name: string
  execute: StepExecutor<T>
  description?: string
  paramsSchema?: ParamSchema[]
}

export class Step<T extends Record<string, any> = {}> extends TypedEmitter<
  StepEventMap<T>
> {
  id: string
  name: string
  private _execute: StepExecutor<T>
  description?: string
  paramsSchema?: ParamSchema[]

  status = StepStatus.Ready

  constructor(config: StepOptions<T>) {
    super()
    this.id = config.id
    this.name = config.name
    this._execute = config.execute
    this.description = config.description
    this.paramsSchema = config.paramsSchema

    this.connectToSubscriptions()
  }

  private get execUtils(): StepExecutorUtilities<T> {
    return { stream: this }
  }

  async execute(params: T = {} as T) {
    this.emit('STEP_STARTING', { step: this })
    this.status = StepStatus.Running

    try {
      const result = await this._execute.call(this, params, this.execUtils)
      this.emit('STEP_COMPLETE', { step: this, result })
    } catch (error) {
      this.emit('STEP_FAILED', { step: this, error })
    } finally {
      this.status = StepStatus.Ready
    }

    return this
  }

  private publishUpdate(type: StepChangeType) {
    pubsub.publish('stepUpdated', { type, step: this })
  }

  private connectToSubscriptions() {
    this.on('STEP_STARTING', () => this.publishUpdate(StepChangeType.Starting))
    this.on('STEP_COMPLETE', () => this.publishUpdate(StepChangeType.Complete))
    this.on('STEP_FAILED', () => this.publishUpdate(StepChangeType.Failed))
  }
}
