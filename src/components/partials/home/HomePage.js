import React, {Component, createRef} from 'react'
import {Carousel, CarouselItem} from 'reactstrap'

export default class HomePage extends Component {
  items = [
    {src: '/images/home-bg-1.jpg', altText: 'Home BG 1'},
    {src: '/images/home-bg-2.png', altText: 'Home BG 2'}
  ]
  el = createRef()
  state = {
    activeIndex: 0
  }

  constructor(props) {
    super(props)
    this.onExited = this.onExited.bind(this)
    this.onExiting = this.onExiting.bind(this)
    this.next = this.next.bind(this)
    this.prev = this.prev.bind(this)
    this.gotoIndex = this.gotoIndex.bind(this)
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
    this.setState({
      activeIndex: activeIndex === this.items.length - 1 ? 0 : activeIndex + 1
    })
  }

  prev() {
    if (this.animating) return
    let {activeIndex} = this.state
    this.setState({
      activeIndex: activeIndex === 0 ? this.items.length - 1 : activeIndex - 1
    })
  }

  gotoIndex(idx) {
    if (this.animating) return
    this.setState({activeIndex: idx})
  }

  carouselItem() {
    return this.items.map((it, i) => (
      <CarouselItem onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={i}>
        <img src={it.src} alt={it.altText}/>
      </CarouselItem>
    ))
  }

  carouesel() {
    let {activeIndex} = this.state
    return (
      <Carousel activeIndex={activeIndex}
                next={this.next}
                previous={this.prev}
                className='carousel-fade home-carousel'>
        {this.carouselItem()}
      </Carousel>
    )
  }

  btnIndicator() {
    let {activeIndex} = this.state
    let items = this.items.map((it, i) => {
      let active = activeIndex === i ? 'active' : ''
      return (
        <button type='button'
                className={`home-btn-indicator ${active}`}
                onClick={e => this.gotoIndex(i)}
                key={i}/>
      )
    })
    return (
      <div className='home-indicator'>
        {items}
      </div>
    )
  }

  btnDown() {
    let {gotoidx} = this.props
    return (
      <div className='home-down'>
        <button type='button' className='home-btn-down' onClick={() => gotoidx()}>
          <i className='fon fon-caret-down fon-w'/>
        </button>
      </div>
    )
  }

  btnGroup() {
    return (
      <div className='home-btn-group'>
        {this.btnIndicator()}
        {this.btnDown()}
      </div>
    )
  }

  render() {
    return (
      <div className='root-container' id='home' ref={el => this.el = el}>
        <div className='home'>
          {this.carouesel()}
          {this.btnGroup()}
        </div>
      </div>
    )
  }
}
