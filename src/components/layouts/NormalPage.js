import React, {Component, Fragment} from 'react'
import Header from 'components/partials/Header'

export default class NormalPage extends Component {
  state = {
    isOpen: false
  }

  constructor(props) {
    super(props)
    this.toggleOpen = this.toggleOpen.bind(this)
  }

  toggleOpen() {
    let {isOpen} = this.state
    this.setState({
      isOpen: !isOpen
    })
  }

  render() {
    let {children} = this.props
    let {isOpen}  = this.state
    return (
      <Fragment>
        <Header isopen={isOpen} toggleopen={this.toggleOpen} />
        {children}
      </Fragment>
    )
  }
}
