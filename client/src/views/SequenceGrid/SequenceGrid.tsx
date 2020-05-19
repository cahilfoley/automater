import React from 'react'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import { LoadingScreen } from '../../components/LoadingScreen'

import { useSequenceListQuery, Sequence } from './queries.generated'
import { SequenceGridItem } from './SequenceGridItem'

const emptyArray: Sequence[] = []

export const SequenceGrid = () => {
  const sequenceQuery = useSequenceListQuery()

  if (sequenceQuery.loading) return <LoadingScreen />

  const sequences = sequenceQuery.data?.sequences ?? emptyArray

  return (
    <>
      <Typography variant="h2" gutterBottom>
        Sequences
      </Typography>
      <Grid container spacing={2}>
        {sequences.map((sequence) => (
          <Grid key={sequence.id} item sm={1} md={2} lg={3} xl={4}>
            <SequenceGridItem sequence={sequence} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}
