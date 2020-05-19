import React from 'react'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import { useParams } from 'react-router-dom'

import { LoadingScreen } from '../../components/LoadingScreen'
import { StepDisplay } from '../../containers/StepDisplay'

import { useSequenceInfoQuery, Sequence } from './queries.generated'

export interface SequenceDetailsParams {
  sequenceID: string
}

export const SequenceDetails = () => {
  const params = useParams<SequenceDetailsParams>()
  const sequenceQuery = useSequenceInfoQuery({
    variables: { id: params.sequenceID },
  })

  if (sequenceQuery.loading) return <LoadingScreen />

  const sequence = sequenceQuery.data?.sequenceByID as Sequence

  return (
    <Grid container spacing={2}>
      <Grid item md={12} lg={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              {sequence.name}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {sequence.steps.length} Steps
            </Typography>
            {sequence.description && (
              <Typography variant="body2" color="textSecondary" component="p">
                {sequence.description}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>

      <Grid item md={12} lg={8}>
        <Card>
          <CardContent>
            <Typography variant="h4" component="h2" gutterBottom>
              Sequence Steps
            </Typography>
            <List>
              {sequence.steps.map((step, index, allSteps) => (
                <ListItem key={step.id} divider={index !== allSteps.length - 1}>
                  <StepDisplay stepID={step.id} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
