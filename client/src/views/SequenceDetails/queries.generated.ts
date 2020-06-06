// =========== THIS FILE IS AUTOMATICALLY GENERATED =========== //
/* eslint-disable */
import * as Types from '../../graphql/types'

import { gql } from 'graphql.macro'
import * as ApolloReactCommon from '@apollo/client'
import * as ApolloReactHooks from '@apollo/client'
export type Maybe<T> = T | null

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type ParamSchema = {
  __typename?: 'ParamSchema'
  disabled?: Maybe<Scalars['Boolean']>
  id: Scalars['String']
  label?: Maybe<Scalars['String']>
  multiline?: Maybe<Scalars['Boolean']>
  rows?: Maybe<Scalars['Int']>
  debounce?: Maybe<Scalars['Int']>
  value?: Maybe<Scalars['String']>
  required?: Maybe<Scalars['Boolean']>
  helperText?: Maybe<Scalars['String']>
}

export enum StepStatus {
  Ready = 'Ready',
  Running = 'Running',
}

export type Step = {
  __typename?: 'Step'
  id: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  paramsSchema?: Maybe<Array<ParamSchema>>
  status: StepStatus
}

export type Sequence = {
  __typename?: 'Sequence'
  id: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  steps: Array<Step>
}

export type Query = {
  __typename?: 'Query'
  sequences: Array<Sequence>
  sequenceByID?: Maybe<Sequence>
  steps: Array<Step>
  stepByID?: Maybe<Step>
}

export type QuerysequenceByIDArgs = {
  id: Scalars['String']
}

export type QuerystepByIDArgs = {
  id: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  executeStep?: Maybe<Step>
}

export type MutationexecuteStepArgs = {
  id: Scalars['String']
}

export enum StepChangeType {
  Starting = 'Starting',
  Complete = 'Complete',
  Failed = 'Failed',
}

export type StepUpdate = {
  __typename?: 'StepUpdate'
  step: Step
  type?: Maybe<StepChangeType>
}

export type Subscription = {
  __typename?: 'Subscription'
  stepUpdated?: Maybe<StepUpdate>
}

export type SubscriptionstepUpdatedArgs = {
  id?: Maybe<Scalars['String']>
}

export type SequenceInfoQueryVariables = {
  id: Types.Scalars['String']
}

export type SequenceInfoQuery = { __typename?: 'Query' } & {
  sequenceByID?: Types.Maybe<
    { __typename?: 'Sequence' } & Pick<
      Types.Sequence,
      'id' | 'name' | 'description'
    > & {
        steps: Array<
          { __typename?: 'Step' } & Pick<
            Types.Step,
            'id' | 'name' | 'description' | 'status'
          >
        >
      }
  >
}

export const SequenceInfoDocument = gql`
  query SequenceInfo($id: String!) {
    sequenceByID(id: $id) {
      id
      name
      description
      steps {
        id
        name
        description
        status
      }
    }
  }
`

/**
 * __useSequenceInfoQuery__
 *
 * To run a query within a React component, call `useSequenceInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useSequenceInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSequenceInfoQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSequenceInfoQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    SequenceInfoQuery,
    SequenceInfoQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    SequenceInfoQuery,
    SequenceInfoQueryVariables
  >(SequenceInfoDocument, baseOptions)
}
export function useSequenceInfoLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    SequenceInfoQuery,
    SequenceInfoQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    SequenceInfoQuery,
    SequenceInfoQueryVariables
  >(SequenceInfoDocument, baseOptions)
}
export type SequenceInfoQueryHookResult = ReturnType<
  typeof useSequenceInfoQuery
>
export type SequenceInfoLazyQueryHookResult = ReturnType<
  typeof useSequenceInfoLazyQuery
>
export type SequenceInfoQueryResult = ApolloReactCommon.QueryResult<
  SequenceInfoQuery,
  SequenceInfoQueryVariables
>