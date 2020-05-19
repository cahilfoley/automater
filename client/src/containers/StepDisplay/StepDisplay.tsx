import React from 'react'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import {
  useStepInfoQuery,
  useExecuteStepMutation,
  StepStatus,
} from './queries.generated'
import { useStepInfoUpdates } from './hooks'
import styled from 'styled-components'

interface StepProps {
  stepID: string
}

const StepDisplayRoot = styled.div`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
`

export const StepDisplay = (props: StepProps) => {
  const stepInfo = useStepInfoQuery({ variables: { id: props.stepID } })
  useStepInfoUpdates(stepInfo, props.stepID)

  const [executeStep, executionResult] = useExecuteStepMutation({
    variables: { id: props.stepID },
  })

  const step = stepInfo.data?.stepByID

  if (stepInfo.loading)
    return <Typography color="textSecondary">Loading...</Typography>

  if (!step) return <Typography>Step not found</Typography>

  return (
    <StepDisplayRoot>
      <div>
        <Typography component="h3">
          {step.name}{' '}
          <Typography color="textSecondary" component="span">
            ({step.id})
          </Typography>
        </Typography>
        <Typography color="textSecondary" variant="body2" gutterBottom>
          Status: {step.status}
        </Typography>
        {step.description && (
          <Typography paragraph>{step.description}</Typography>
        )}
      </div>
      <div>
        <Button
          disabled={
            step.status === StepStatus.Running || executionResult.loading
          }
          onClick={() => executeStep()}
        >
          Execute
        </Button>
      </div>
    </StepDisplayRoot>
  )
}
