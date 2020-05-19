import React from 'react'

import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'

export const LoadingScreen = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
      <Typography variant="h3">Loading</Typography>
      <CircularProgress size={100} />
      <Typography variant="h5">
        Please wait while we load the content
      </Typography>
    </Box>
  )
}
