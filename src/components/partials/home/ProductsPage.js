import React, {Component} from 'react'
import {compose, bindActionCreators} from 'redux'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {isEqual} from 'lodash'
import ParalaxWrapper from 'components/partials/ParalaxWrapper'
import {getFive} from 'store/actions/collections'
import {DUMMY_COLLECTIONS} from 'globals.js'

const stateToProps = function (state) {
  return {
    collections: state.collections
  }
}
const dispatchToProps = function (dispatch) {
  return bindActionCreators({getFive}, dispatch)
}

class ProductsPage extends Component {
  state = {
    collections: DUMMY_COLLECTIONS
  }

  async componentDidMount() {
    let {getFive} = this.props
    try {
      await getFive()
      this.setCollections()
    } catch (e) {
    }
    this.fixBoxHeight()
    this.fixHeight()
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.collections, this.props.collections)) {
      this.setCollections()
    }
  }

  setCollections() {
    let {collections} = this.props
    this.setState({
      collections: collections
    })
  }

  fixHeight() {
    let el = document.getElementById('products')
    let header = document.getElementById('header')
    let container = el.getElementsByClassName('container')[0]
    if (window.innerWidth <= 768) {
      if (container.offsetTop <= header.offsetHeight + 20) {
        container.style.marginTop = (header.offsetHeight + 20) + 'px'
        container.style.height = (window.innerHeight - 20) - (header.offsetHeight + 20) + 'px'
        container.style.overflow = 'auto'
      }
    }
  }

  fixBoxHeight() {
    let el = document.getElementById('products')
    let elBox = el.getElementsByClassName('products-list')
    for (let i = 0; i < elBox.length; i++) {
      let getWidth = elBox[i].offsetWidth
      elBox[i].style.height = `${getWidth}px`
    }
  }

  collectionsMap() {
    let {collections} = this.state
    let cols = collections.map((c, i) => {
      return (
        <div className='col-6 col-md-4' key={i}>
          <Link to={`/products/${c.url}`} className='products-link'>
            <ParalaxWrapper parallaxScale={.2}>
              <div className='products-list'>
                <img src={c.thumbnail} alt={c.name}/>
                <span>{c.name}</span>
              </div>
            </ParalaxWrapper>
          </Link>
        </div>
      )
    })
    return (
      <div className='container'>
        <div className='row'>
          {cols}
          <div className='col-6 col-md-4'>
            <Link to={`/products`} className='products-link'>
              <ParalaxWrapper parallaxScale={.2}>
                <div className='products-list'>
                  <span>Etc.</span>
                </div>
              </ParalaxWrapper>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className='root-container' id='products'>
        <img src='/images/product-bg-1.png' alt='Products BG 1' className='products-bg bg-1'/>
        <img src='/images/product-bg-2.png' alt='Products BG 2' className='products-bg bg-2'/>
        <div className='products'>
          {this.collectionsMap()}
        </div>
      </div>
    )
  }
}

export default compose(
  connect(stateToProps, dispatchToProps)
)(ProductsPage)
