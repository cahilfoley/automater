import { Sequence } from '../internal/Sequence'
import { step1, step2, step3 } from '../steps'

export const demoSequence1 = new Sequence({
  id: 'demo-sequence-1',
  name: 'Demo Sequence #1',
  description: `This is an example description about the first demo sequence, it's pretty great really, you should run it.`,
  steps: [step1, step2],
})

export const demoSequence2 = new Sequence({
  id: 'demo-sequence-2',
  name: 'Demo Sequence #2',
  description: `This is an example description about the second demo sequence, it's pretty great really, you should run it.`,
  steps: [step2, step3],
})
