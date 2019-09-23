import React, {Component} from 'react'
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'connected-react-router'
import Routes from 'routers'

export default class Root extends Component {
  render() {
    let {store, history} = this.props
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Routes/>
        </ConnectedRouter>
      </Provider>
    )
  }
}
