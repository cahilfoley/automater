import React from 'react'
import styled from 'styled-components/macro'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import { SequenceGrid } from './views/SequenceGrid'
import { SequenceDetails } from './views/SequenceDetails'

const AppRoot = styled.div`
  flex-grow: 1;
  background: #f5f5f5;
  min-height: 100vh;
`

const PaddedContainer = styled(Container)`
  padding: 16px;
`

function App() {
  return (
    <Router>
      <CssBaseline />
      <AppRoot>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Automater</Typography>
          </Toolbar>
        </AppBar>
        <PaddedContainer maxWidth="lg">
          <Switch>
            <Route path="/sequences" exact>
              <SequenceGrid />
            </Route>
            <Route path="/sequences/:sequenceID" exact>
              <SequenceDetails />
            </Route>
            <Route path="/">
              <Redirect to="/sequences" />
            </Route>
          </Switch>
        </PaddedContainer>
      </AppRoot>
    </Router>
  )
}

export default App
