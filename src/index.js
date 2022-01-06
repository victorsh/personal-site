'use strict'

import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { store } from './store/store'
import { createBrowserHistory } from 'history';

import app from './app'
import ThreeD from './lib/ThreeD'

ReactDom.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

document.addEventListener('DOMContentLoaded', () => {
  const threed = new ThreeD()
  threed.init()
})
