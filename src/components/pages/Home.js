import React, {Component, Fragment, createRef} from 'react'
import Velocity from 'velocity-animate'
import Header from 'components/partials/home/Header'
import Navigation from 'components/partials/home/Navigation'
import HomePage from 'components/partials/home/HomePage'
import ProductsPage from 'components/partials/home/ProductsPage'
import {PAGES} from 'globals.js'

export default class Home extends Component {
  state = {
    pages: PAGES,
    activeIndex: 0
  }
  elContent = createRef()
  touchStartY = 0
  touchStartX = 0
  touchEndY = 0
  touchEndX = 0
  lastAnimation = 0
  scrollings = []


  constructor(props) {
    super(props)
    this.mouseWheel = this.mouseWheel.bind(this)
    this.gotoIndex = this.gotoIndex.bind(this)
    this.touchStartHandler = this.touchStartHandler.bind(this)
    this.touchMoveHandler = this.touchMoveHandler.bind(this)
  }

  componentDidMount() {
    this.bodyFix()
    document.addEventListener('mousewheel', this.mouseWheel)
    document.addEventListener('wheel', this.mouseWheel)
    this.elContent.addEventListener('touchstart', this.touchStartHandler)
    this.elContent.addEventListener('touchmove', this.touchMoveHandler)
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.activeIndex !== this.state.activeIndex) {
      this.move()
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousewheel', this.mouseWheel)
    document.removeEventListener('wheel', this.mouseWheel)
    this.elContent.removeEventListener('touchstart', this.touchStartHandler)
    this.elContent.removeEventListener('touchmove', this.touchMoveHandler)
  }

  bodyFix() {
    let body = document.getElementsByTagName('body')[0]
    body.classList.add('body-fix')
  }

  mouseWheel(e) {
    this.alloctions(e)
  }

  alloctions(e) {
    let delta = Math.max(-1, Math.min(1,
      (e.wheelDelta || -e.deltaY || -e.detail)))
    if (delta < 0) {
      this.next()
    } else {
      this.prev()
    }
  }

  next() {
    let {activeIndex, pages} = this.state
    let idx = activeIndex === pages.length - 1 ? activeIndex : activeIndex + 1
    this.setState({
      activeIndex: idx,
      pages: pages.map((p, i) => {
        if (i === idx) p.active = true
        else p.active = false
        return p
      })
    })
  }

  prev() {
    let {activeIndex, pages} = this.state
    let idx = activeIndex === 0 ? activeIndex : activeIndex - 1
    this.setState({
      activeIndex: idx,
      pages: pages.map((p, i) => {
        if (i === idx) p.active = true
        else p.active = false
        return p
      })
    })
  }

  gotoIndex(idx) {
    let {pages} = this.state
    this.setState({
      activeIndex: idx,
      pages: pages.map((p, i) => {
        if (i === idx) p.active = true
        else p.active = false
        return p
      })
    })
  }

  isMoving() {
    let timeNow = new Date().getTime()
    return timeNow - this.lastAnimation < 600 + 700;

  }

  move() {
    let {activeIndex} = this.state
    Velocity(this.elContent, {
      translateY: `${activeIndex * -this.elContent.offsetHeight}px`,
    }, {
      duration: 700
    })
    this.lastAnimation = new Date().getTime()
  }

  isReallyTouch(e) {
    return typeof e.pointerType === 'undefined' || e.pointerType !== 'mouse'
  }

  getEventsPage(e) {
    let events = []
    events.y = (typeof e.pageY !== 'undefined' && (e.pageY || e.pageX) ? e.pageY : e.touches[0].pageY)
    events.x = (typeof e.pageX !== 'undefined' && (e.pageY || e.pageX) ? e.pageX : e.touches[0].pageX)
    return events
  }

  touchStartHandler(e) {
    if (this.isReallyTouch(e)) {
      let touchEvents = this.getEventsPage(e)
      this.touchStartY = touchEvents.y
      this.touchStartX = touchEvents.x
    }
  }

  touchMoveHandler(e) {
    console.log(e.target)
    if (this.isReallyTouch(e)) {
      if (!this.isMoving()) {
        let touchEvents = this.getEventsPage(e)
        this.touchEndY = touchEvents.y
        this.touchEndX = touchEvents.x
        if (Math.abs(this.touchStartY - this.touchEndY) > (this.elContent.offsetHeight / 100 * 5)) {
          if (this.touchStartY > this.touchEndY) {
            this.next()
          } else if (this.touchEndY > this.touchStartY) {
            this.prev()
          }
        }
      }
    }
  }

  render() {
    let {pages} = this.state
    return (
      <Fragment>
        <Header pages={pages}/>
        <Navigation pages={pages} gotoidx={this.gotoIndex}/>
        <div className='root-content' ref={el => this.elContent = el}>
          <HomePage gotoidx={() => this.gotoIndex(1)}/>
          <ProductsPage/>
        </div>
      </Fragment>
    )
  }
}
