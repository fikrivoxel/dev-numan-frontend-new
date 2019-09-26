import React, {Component, Fragment} from 'react'
import {compose, bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Header from 'components/partials/Header'
import Sidebar from 'components/partials/Sidebar'
import {getAll, removeCollections} from 'store/actions/collections'

const mapDispatchToProps = function (dispatch) {
  return bindActionCreators({getAll, removeCollections}, dispatch)
}

class NormalPage extends Component {
  state = {
    isOpen: false
  }

  constructor(props) {
    super(props)
    this.toggleOpen = this.toggleOpen.bind(this)
  }

  async componentDidMount() {
    let {getAll} = this.props
    try {
      await getAll()
    } catch (e) {
    }
    this.addBackground()
  }

  componentWillUnmount() {
    this.removeBackground()
    this.props.removeCollections()
  }

  addBackground() {
    document.body.classList.add('body-bgc')
  }

  removeBackground() {
    document.body.classList.remove('body-bgc')
  }

  toggleOpen() {
    let {isOpen} = this.state
    this.setState({
      isOpen: !isOpen
    })
  }

  render() {
    let {children} = this.props
    let {isOpen} = this.state
    return (
      <Fragment>
        <Header isopen={isOpen} toggleopen={this.toggleOpen}/>
        <div className='container make-col'>
          <Sidebar isopen={isOpen}/>
          <div className='normal-content'>
            {children}
          </div>
        </div>
      </Fragment>
    )
  }
}

export default compose(
  connect(null, mapDispatchToProps)
)(NormalPage)
