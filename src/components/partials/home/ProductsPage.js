import React, {Component} from 'react'
import {compose, bindActionCreators} from 'redux'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {isEqual, cloneDeep} from 'lodash'
import ParalaxWrapper from 'components/partials/ParalaxWrapper'
import {getFive, removeCollections} from 'store/actions/collections'
import {DUMMY_COLLECTIONS} from 'globals.js'

const stateToProps = function (state) {
  return {
    collections: state.collections
  }
}
const dispatchToProps = function (dispatch) {
  return bindActionCreators({getFive, removeCollections}, dispatch)
}

class ProductsPage extends Component {
  state = {
    collections: cloneDeep(DUMMY_COLLECTIONS)
  }

  async componentDidMount() {
    let {getFive} = this.props
    try {
      await getFive()
    } catch (e) {}
    this.fixHeight()
    this.fixBoxHeight()
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.collections, this.props.collections)) {
      this.setCollections()
    }
  }

  componentWillUnmount() {
    this.props.removeCollections()
  }

  setCollections() {
    let {collections} = this.props
    this.setState({
      collections: collections
    })
  }

  fixHeight() {
    let el = document.getElementById('products')
    let container = el.getElementsByClassName('container')[0]
    if (window.innerWidth <= 768) {
      if (container.offsetTop <= 150) {
        container.style.marginTop = '150px'
        container.style.height = (window.innerHeight - 20) - 150 + 'px'
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
        <div className='col-6 col-md-4 bounce' key={i}>
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
      <div className='container' id='products-container'>
        <div className='row' id='products-row'>
          {cols}
          <div className='col-6 col-md-4 bounce'>
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
        <img src='/images/product-bg-2.png' alt='Products BG 2' className='products-bg bg-2'/>
        <div className='products'>
          <img src='/images/product-bg-1.png' alt='Products BG 1' className='products-bg bg-1'/>
          {this.collectionsMap()}
        </div>
      </div>
    )
  }
}

export default compose(
  connect(stateToProps, dispatchToProps)
)(ProductsPage)
