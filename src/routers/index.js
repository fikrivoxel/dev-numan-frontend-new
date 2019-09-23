import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import routes from 'routers/routes'
import Layouts from 'components/Layouts'

export default class Routers extends Component {
  routes = routes

  routesMap() {
    return this.routes.map((r, i) => (
      <Route {...r} key={i}/>
    ))
  }

  render() {
    return (
      <Layouts>
        <Switch>
          {this.routesMap()}
        </Switch>
      </Layouts>
    )
  }
}
