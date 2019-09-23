import React from 'react'
import {render} from 'react-dom'
import {configureStore, history} from 'store/config'
import Root from 'components/Root'
import 'styles/app.scss'

const store = configureStore()

render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)
