import React, {Component} from 'react'
import {Carousel, CarouselItem} from 'reactstrap'

export default class HomePage extends Component {
  items = [
    {src: '/images/home-bg-1.jpg', altText: 'Home BG 1'},
    {src: '/images/home-bg-2.png', altText: 'Home BG 2'}
  ]
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
    this.setState({activeIdx: idx})
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

  render() {
    return (
      <div className='root-container' id='home'>
        <div className='home'>
          {this.carouesel()}
        </div>
      </div>
    )
  }
}
