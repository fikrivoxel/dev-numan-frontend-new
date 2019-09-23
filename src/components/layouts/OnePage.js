import React, {Component, Fragment} from 'react'

export default class OnePage extends Component {
  render() {
    let {children} = this.props
    return (
      <Fragment>
        {children}
      </Fragment>
    )
  }
}
