import React, {Component} from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import {isEqual} from 'lodash'

const mapStateToProps = function (state) {
  return {
    collections: state.collections
  }
}

class Sidebar extends Component {
  state = {
    url: ''
  }

  async componentDidMount() {
    this.getUrl()
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.location, this.props.location)) {
      this.getUrl()
    }
  }

  getUrl() {
    let {location} = this.props
    let getUrlArr = location.pathname.split('/')
    let getUrl = getUrlArr[getUrlArr.length - 1]
    this.setState({url: getUrl})
  }

  collectionsMap() {
    let {collections} = this.props
    let {url} = this.state
    return collections.map((c, i) => {
      let active = url === c.url ? 'active' : ''
      return (
        <li key={i}>
          <Link to={`/products/${c.url}`} className={active}>
            {c.name}
          </Link>
        </li>
      )
    })
  }

  render() {
    let {isopen} = this.props
    let {url} = this.state
    return (
      <nav className={`sidebar ${isopen ? 'active' : ''}`}>
        <div className='sidebar-box'>
          <div className='sidebar-box-title'>
            Products
          </div>
          <ul className='sidebar-box-menu'>
            <li>
              <Link to={`/products`} className={url === 'products' ? 'active' : ''}>
                All
              </Link>
            </li>
            {this.collectionsMap()}
          </ul>
        </div>
      </nav>
    )
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps)
)(Sidebar)
