import React, {Component, Fragment} from 'react'
import Header from 'components/partials/Header'
import Sidebar from 'components/partials/Sidebar'

export default class NormalPage extends Component {
  state = {
    isOpen: false
  }

  constructor(props) {
    super(props)
    this.toggleOpen = this.toggleOpen.bind(this)
  }

  componentDidMount() {
    this.addBackground()
  }

  componentWillUnmount() {
    this.removeBackground()
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
    let {isOpen}  = this.state
    return (
      <Fragment>
        <Header isopen={isOpen} toggleopen={this.toggleOpen} />
        <div className='container make-col'>
          <Sidebar isopen={isOpen} />
          <div className='normal-content'>
            {children}
          </div>
        </div>
      </Fragment>
    )
  }
}
