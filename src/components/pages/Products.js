import React, {Component, Fragment} from 'react'
import {Switch, Route} from 'react-router-dom'
import ListGrid from 'components/partials/products/ListGrid'

class Products extends Component {
  render() {
    let {match} = this.props
    return (
      <Fragment>
        <Switch>
          <Route path={`${match.path}/:url`} component={ListGrid} />
          <Route path={match.path} component={ListGrid}/>
        </Switch>
      </Fragment>
    )
  }
}

export default Products
