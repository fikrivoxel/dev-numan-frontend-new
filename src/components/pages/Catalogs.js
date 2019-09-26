import React, {Component} from 'react'
import {connect} from 'react-redux'
import {isEmpty, has, isEqual, capitalize} from 'lodash'
import {Carousel, CarouselItem} from 'reactstrap'

const mapStateToProps = function (state) {
  return {
    catalogs: state.catalogs
  }
}

class Catalogs extends Component {
  state = {
    catalogs: {},
    activeIndex: 0,
    isOpen: false
  }

  constructor(props) {
    super(props)
    this.onExiting = this.onExiting.bind(this)
    this.onExited = this.onExited.bind(this)
    this.next = this.next.bind(this)
    this.prev = this.prev.bind(this)
    this.goToIndex = this.goToIndex.bind(this)
    this.shareToggle = this.shareToggle.bind(this)
  }


  componentDidMount() {
    this.changeProps()
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.match, prevProps.match)) {
      this.changeProps()
    }
  }

  changeProps() {
    let {match, catalogs, history} = this.props
    let find = catalogs.find((c) => {
      let id = (isEmpty(match.params) ? '' : !has(match.params, 'id') ? '' : match.params.id)
      return parseInt(c.id) === parseInt(id)
    })
    if (isEmpty(find)) return history.push({pathname: '/products'})
    this.setState({
      catalogs: find
    })
  }

  carousel() {
    let {images} = this.state.catalogs
    let {activeIndex} = this.state
    let img = !isEmpty(images) && images.map((im, i) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={i}>
          <img src={im} alt={im} className='view-box-img'/>
        </CarouselItem>
      )
    })
    return !isEmpty(images) && (
      <Carousel activeIndex={activeIndex}
                interval={false}
                next={this.next}
                previous={this.prev}>
        {img}
      </Carousel>
    )
  }

  onExiting() {
    this.animating = true
  }

  onExited() {
    this.animating = false
  }

  next() {
    if (this.animating) return
    let {activeIndex} = this.state
    let {images} = this.state.catalogs
    let nxtIdx = activeIndex === images.length - 1 ?
      0 : activeIndex + 1
    this.setState({activeIndex: nxtIdx})
  }

  prev() {
    if (this.animating) return
    let {activeIndex} = this.state
    let {images} = this.state.catalogs
    let nxtIdx = activeIndex === 0 ?
      images.length - 1 : activeIndex - 1
    this.setState({activeIndex: nxtIdx})
  }

  goToIndex(newIdx) {
    if (this.animating) return
    this.setState({activeIndex: newIdx})
  }

  coloursMap() {
    let {colors} = this.state.catalogs
    let c = !isEmpty(colors) && colors.map((cl, i) => {
      return (
        <button className='btn btn-primary w-100' style={{backgroundColor: cl.hex, borderColor: cl.hex, color: 'white'}}
                key={i} onClick={() => this.goToIndex(i)}>
          {capitalize(cl.color)}
        </button>
      )
    })
    return (
      <div className='btn-group btn-group-sm d-flex'>
        {c}
      </div>
    )
  }

  shareToggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    let {catalogs, isOpen} = this.state
    return (
      <div className='row'>
        <div className='col-12'>
          <div className='view-box'>
            <div className='view-box-title'>
              {catalogs.name}
              <div className='view-share' id='view-share' style={{height: isOpen ? 36 * 4 : 36}}>
                <ul className='view-share-menu'>
                  <li>
                    <span onClick={this.shareToggle}>
                      <i className='fon fon-share fon-w' />
                    </span>
                  </li>
                  <li>
                    <a href="#">
                      <i className='fon fon-twitter fon-w' />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className='fon fon-facebook fon-w' />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className='fon fon-googleplus fon-w' />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {this.carousel()}
            <table className='table mb-0'>
              <tbody>
              <tr>
                <th>Price</th>
                <td>Rp. {catalogs.price}</td>
              </tr>
              <tr>
                <th style={{verticalAlign: 'middle'}}>Colors</th>
                <td>
                  {this.coloursMap()}
                </td>
              </tr>
              </tbody>
            </table>
            <div className='view-box-desc'>
              <h3 className='view-box-desc-title'>Description</h3>
              <div className='view-box-desc-text' dangerouslySetInnerHTML={{
                __html: catalogs.description
              }}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Catalogs)
