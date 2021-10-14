'use strict'

import React, { useEffect } from 'react'
import { BrowserRouter, Route, Switch, Link as RouterLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './store/actions'

import Home from './pages/Home'
import About from './pages/About'
import HomeThree from './pages/HomeThree'
import './style.scss'

const App = () => {
  const rstate = useSelector((rstate) => rstate)
  const dispatch = useDispatch()
  const { appState } = bindActionCreators(actions, dispatch)

  useEffect(() => {
    appState({...rstate.main, status: 'landing'})
    return () => {
    }
  }, []) //empty array causes this effect to only run on mount

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <HomeThree />
          </Route>
          <Route path='/about'>
            <About />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App