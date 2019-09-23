import React, {Component} from 'react'
import {compose} from 'redux'
import {withRouter} from 'react-router-dom'
import {isEqual} from 'lodash'
import OnePage from 'components/layouts/OnePage'
import NormalPage from 'components/layouts/NormalPage'

class Layouts extends Component {
  state = {
    layouts: 'OnePage'
  }
  layouts = {
    OnePage,
    NormalPage
  }

  componentDidMount() {
    this.changeLayouts()
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.location, prevProps.location)) {
      this.changeLayouts()
    }
  }

  changeLayouts() {
    let {location} = this.props
    this.setState({
      layouts: location.pathname === '/' ? 'OnePage' : 'NormalPage'
    })
  }

  render() {
    let {children} = this.props
    let {layouts} = this.state
    let TagName = this.layouts[layouts]
    return (
      <TagName>
        {children}
      </TagName>
    )
  }
}

export default compose(withRouter)(Layouts)
