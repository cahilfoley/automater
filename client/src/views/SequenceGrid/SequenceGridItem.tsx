import React, { useMemo } from 'react'

import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import { Sequence, StepStatus } from './queries.generated'
import { useHistory } from 'react-router-dom'

export interface SequenceGridItemProps {
  sequence: Sequence
}

export const SequenceGridItem = ({ sequence }: SequenceGridItemProps) => {
  const history = useHistory()

  const hasRunningStep = useMemo(
    () => sequence.steps.some((step) => step.status === StepStatus.Running),
    [sequence.steps],
  )

  return (
    <Card>
      <CardActionArea onClick={() => history.push(`/sequences/${sequence.id}`)}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {sequence.name}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            {sequence.steps.length} Steps {hasRunningStep && '(Running)'}
          </Typography>
          {sequence.description && (
            <Typography variant="body2" color="textSecondary" component="p">
              {sequence.description}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
