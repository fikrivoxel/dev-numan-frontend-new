import React, {Component, createRef} from 'react'
import {compose, bindActionCreators} from 'redux'
import {connect} from 'react-redux'
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
  el = createRef()
  state = {
    collections: this.props.collections || DUMMY_COLLECTIONS
  }
  async componentDidMount() {
    let {getFive} = this.props
    await getFive()
  }

  render() {
    return (
      <div className='root-container' id='products' ref={el => this.el = el}>
        <img src='/images/product-bg-1.png' alt='Products BG 1' className='products-bg bg-1'/>
        <img src='/images/product-bg-2.png' alt='Products BG 2' className='products-bg bg-2'/>
        <div className='products'>
          a
        </div>
      </div>
    )
  }
}

export default compose(
  connect(stateToProps, dispatchToProps)
)(ProductsPage)