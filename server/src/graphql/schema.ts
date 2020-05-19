import { gql, makeExecutableSchema, withFilter } from 'apollo-server-express'

import * as steps from '../steps'
import * as sequences from '../sequences'
import { pubsub } from './pubsub'

import { keyBy } from '../utils'
import { Step } from '../internal/Step'
import { StepChangeType } from '../events'

export const typeDefs = gql`
  type ParamSchema {
    disabled: Boolean
    id: String!
    label: String
    multiline: Boolean
    rows: Int
    debounce: Int
    value: String
    required: Boolean
    helperText: String
  }

  enum StepStatus {
    Ready
    Running
  }

  type Step {
    id: String!
    name: String!
    description: String
    paramsSchema: [ParamSchema!]
    status: StepStatus!
  }

  type Sequence {
    id: String!
    name: String!
    description: String
    steps: [Step!]!
  }

  type Query {
    sequences: [Sequence!]!
    sequenceByID(id: String!): Sequence
    steps: [Step!]!
    stepByID(id: String!): Step
  }

  type Mutation {
    executeStep(id: String!): Step
  }

  enum StepChangeType {
    Starting
    Complete
    Failed
  }

  type StepUpdate {
    step: Step!
    type: StepChangeType
  }

  type Subscription {
    stepUpdated(id: String): StepUpdate
  }

  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`

const stepsByID = keyBy(Object.values(steps), 'id')
const sequencesByID = keyBy(Object.values(sequences), 'id')

export const resolvers = {
  Query: {
    sequences: () => Object.values(sequencesByID),
    sequenceByID: (parent: void, { id }: { id: string }) => sequencesByID[id],
    steps: () => Object.values(stepsByID),
    stepByID: (parent: void, { id }: { id: string }) => stepsByID[id],
  },
  Mutation: {
    executeStep: async (parent: void, { id }: { id: string }) => {
      const step = stepsByID[id]
      if (step) return await step.execute()
    },
  },
  Subscription: {
    stepUpdated: {
      resolve: (payload: { type: StepChangeType; step: Step }) => payload,
      subscribe: withFilter(
        () => pubsub.asyncIterator('stepUpdated'),
        (payload, variables) => {
          if (!('id' in variables)) return true
          return payload.step.id === variables.id
        }
      ),
    },
  },
}

export const schema = makeExecutableSchema({ typeDefs, resolvers })
