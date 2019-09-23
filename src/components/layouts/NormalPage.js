import React, {Component, Fragment} from 'react'

export default class NormalPage extends Component {
  render() {
    let {children} = this.props
    return (
      <Fragment>
        {children}
      </Fragment>
    )
  }
}
