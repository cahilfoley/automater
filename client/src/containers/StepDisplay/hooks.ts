import {
  StepInfoQueryHookResult,
  StepUpdatesSubscription,
  StepUpdatesDocument,
  Step,
} from './queries.generated'
import { useEffect } from 'react'

export const useStepInfoUpdates = (
  stepInfo: StepInfoQueryHookResult,
  stepID: string,
) => {
  useEffect(() => {
    return stepInfo.subscribeToMore<StepUpdatesSubscription>({
      document: StepUpdatesDocument,
      variables: { id: stepID },
      updateQuery: (prev, { subscriptionData }) => {
        return {
          stepByID: {
            ...(prev.stepByID as Step),
            ...subscriptionData.data.stepUpdated?.step,
          },
        }
      },
    })
  }, [stepID, stepInfo])
}
