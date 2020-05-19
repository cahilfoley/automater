import { Step } from '../internal/Step'
import { wait } from '../utils'

export const step1 = new Step({
  id: 'demo-step-1',
  name: 'Demo Step #1',
  execute: async () => {
    console.log('Running step #1')
    await wait(2000)
  },
})

export const step2 = new Step({
  id: 'demo-step-2',
  name: 'Demo Step #2',
  execute: async () => {
    console.log('Running step #2')
    await wait(2000)
  },
})

export const step3 = new Step({
  id: 'demo-step-3',
  name: 'Demo Step #3',
  execute: async () => {
    console.log('Running step #3')
    await wait(2000)
  },
})
