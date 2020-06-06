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

export type commonStepFieldsFragment = { __typename?: 'Step' } & Pick<
  Types.Step,
  'id' | 'name' | 'description' | 'status'
>

export type StepInfoQueryVariables = {
  id: Types.Scalars['String']
}

export type StepInfoQuery = { __typename?: 'Query' } & {
  stepByID?: Types.Maybe<{ __typename?: 'Step' } & commonStepFieldsFragment>
}

export type StepUpdatesSubscriptionVariables = {
  id: Types.Scalars['String']
}

export type StepUpdatesSubscription = { __typename?: 'Subscription' } & {
  stepUpdated?: Types.Maybe<
    { __typename?: 'StepUpdate' } & Pick<Types.StepUpdate, 'type'> & {
        step: { __typename?: 'Step' } & commonStepFieldsFragment
      }
  >
}

export type ExecuteStepMutationVariables = {
  id: Types.Scalars['String']
}

export type ExecuteStepMutation = { __typename?: 'Mutation' } & {
  executeStep?: Types.Maybe<
    { __typename?: 'Step' } & Pick<
      Types.Step,
      'id' | 'name' | 'description' | 'status'
    >
  >
}

export const commonStepFieldsFragmentDoc = gql`
  fragment commonStepFields on Step {
    id
    name
    description
    status
  }
`
export const StepInfoDocument = gql`
  query StepInfo($id: String!) {
    stepByID(id: $id) {
      ...commonStepFields
    }
  }
  ${commonStepFieldsFragmentDoc}
`

/**
 * __useStepInfoQuery__
 *
 * To run a query within a React component, call `useStepInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useStepInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStepInfoQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useStepInfoQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    StepInfoQuery,
    StepInfoQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<StepInfoQuery, StepInfoQueryVariables>(
    StepInfoDocument,
    baseOptions,
  )
}
export function useStepInfoLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    StepInfoQuery,
    StepInfoQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<StepInfoQuery, StepInfoQueryVariables>(
    StepInfoDocument,
    baseOptions,
  )
}
export type StepInfoQueryHookResult = ReturnType<typeof useStepInfoQuery>
export type StepInfoLazyQueryHookResult = ReturnType<
  typeof useStepInfoLazyQuery
>
export type StepInfoQueryResult = ApolloReactCommon.QueryResult<
  StepInfoQuery,
  StepInfoQueryVariables
>
export const StepUpdatesDocument = gql`
  subscription StepUpdates($id: String!) {
    stepUpdated(id: $id) {
      type
      step {
        ...commonStepFields
      }
    }
  }
  ${commonStepFieldsFragmentDoc}
`

/**
 * __useStepUpdatesSubscription__
 *
 * To run a query within a React component, call `useStepUpdatesSubscription` and pass it any options that fit your needs.
 * When your component renders, `useStepUpdatesSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStepUpdatesSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useStepUpdatesSubscription(
  baseOptions?: ApolloReactHooks.SubscriptionHookOptions<
    StepUpdatesSubscription,
    StepUpdatesSubscriptionVariables
  >,
) {
  return ApolloReactHooks.useSubscription<
    StepUpdatesSubscription,
    StepUpdatesSubscriptionVariables
  >(StepUpdatesDocument, baseOptions)
}
export type StepUpdatesSubscriptionHookResult = ReturnType<
  typeof useStepUpdatesSubscription
>
export type StepUpdatesSubscriptionResult = ApolloReactCommon.SubscriptionResult<
  StepUpdatesSubscription
>
export const ExecuteStepDocument = gql`
  mutation ExecuteStep($id: String!) {
    executeStep(id: $id) {
      id
      name
      description
      status
    }
  }
`
export type ExecuteStepMutationFn = ApolloReactCommon.MutationFunction<
  ExecuteStepMutation,
  ExecuteStepMutationVariables
>

/**
 * __useExecuteStepMutation__
 *
 * To run a mutation, you first call `useExecuteStepMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useExecuteStepMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [executeStepMutation, { data, loading, error }] = useExecuteStepMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useExecuteStepMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ExecuteStepMutation,
    ExecuteStepMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    ExecuteStepMutation,
    ExecuteStepMutationVariables
  >(ExecuteStepDocument, baseOptions)
}
export type ExecuteStepMutationHookResult = ReturnType<
  typeof useExecuteStepMutation
>
export type ExecuteStepMutationResult = ApolloReactCommon.MutationResult<
  ExecuteStepMutation
>
export type ExecuteStepMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ExecuteStepMutation,
  ExecuteStepMutationVariables
>