import { Step } from './Step'

import { TypedEmitter } from './TypedEmitter'

export interface SequenceConfig {
  id: string
  name: string
  description?: string
  steps: Step[]
}

interface SequenceEventMap {}

export class Sequence extends TypedEmitter<SequenceEventMap> {
  id: string
  name: string
  description?: string
  steps: Step[]

  constructor(config: SequenceConfig) {
    super()
    this.id = config.id
    this.name = config.name
    this.description = config.description
    this.steps = config.steps
  }

  getStepByID(id: string) {
    return this.steps.find((step) => step.id === id)
  }
}
