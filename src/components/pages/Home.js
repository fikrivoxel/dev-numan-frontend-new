import React, {Component, Fragment, createRef} from 'react'
import Velocity from 'velocity-animate'
import {cloneDeep} from 'lodash'
import Header from 'components/partials/home/Header'
import Navigation from 'components/partials/home/Navigation'
import HomePage from 'components/partials/home/HomePage'
import ProductsPage from 'components/partials/home/ProductsPage'
import CatalogsPage from 'components/partials/home/CatalogsPage'
import AboutUsPage from 'components/partials/home/AboutUsPage'
import ContactUsPage from 'components/partials/home/ContactUsPage'
import {PAGES} from 'globals.js'

export default class Home extends Component {
  state = {
    pages: cloneDeep(PAGES),
    activeIndex: 0
  }
  elContent = createRef()
  touchStartY = 0
  touchStartX = 0
  touchEndY = 0
  touchEndX = 0
  lastAnimation = 0
  scrollings = []
  isMove = false


  constructor(props) {
    super(props)
    this.mouseWheel = this.mouseWheel.bind(this)
    this.gotoIndex = this.gotoIndex.bind(this)
    this.touchStartHandler = this.touchStartHandler.bind(this)
    this.touchMoveHandler = this.touchMoveHandler.bind(this)
  }

  componentDidMount() {
    this.bodyFix()
    this.addListener()
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.activeIndex !== this.state.activeIndex) {
      this.move()
      this.hamePageParallax()
      this.animation()
    }
  }

  componentWillUnmount() {
    this.removeBodyFix()
    this.removeListener()
    this.stateReset()
  }

  removeListener() {
    let root = document.getElementById('root')
    document.removeEventListener('mousewheel', this.mouseWheel)
    document.removeEventListener('wheel', this.mouseWheel)
    root.removeEventListener('touchstart', this.touchStartHandler)
    root.removeEventListener('touchmove', this.touchMoveHandler)
  }

  addListener() {
    let root = document.getElementById('root')
    document.addEventListener('mousewheel', this.mouseWheel)
    document.addEventListener('wheel', this.mouseWheel)
    root.addEventListener('touchstart', this.touchStartHandler)
    root.addEventListener('touchmove', this.touchMoveHandler)
  }

  stateReset() {
    this.setState({
      pages: cloneDeep(PAGES),
      activeIndex: 0
    })
  }

  bodyFix() {
    let body = document.body
    body.classList.add('body-fix')
  }

  removeBodyFix() {
    let body = document.body
    body.classList.remove('body-fix')
  }

  mouseWheel(e) {
    this.alloctions(e)
  }


  alloctions(e) {
    let delta = Math.max(-1, Math.min(1,
      (e.wheelDelta || -e.deltaY || -e.detail)))

    let horizontalDetection = typeof e.wheelDeltaX !== 'undefined' || typeof e.deltaX !== 'undefined'
    let isScrollingVertically = (Math.abs(e.wheelDeltaX) < Math.abs(e.wheelDelta)) || (Math.abs(e.deltaX) < Math.abs(e.deltaY) || !horizontalDetection)


    if (this.scrollings.length > 149) {
      this.scrollings.shift()
    }

    this.scrollings.push(delta)

    let curTime = new Date().getTime()
    let prevTime = this.lastAnimation
    let timeDiff = curTime - prevTime
    this.lastAnimation = curTime

    if (timeDiff > 200) {
      this.scrollings = []
    }

    if (!this.isMove) {
      if (this.scrollings.length === 0 && isScrollingVertically) {
        if (delta < 0) {
          this.next()
        } else {
          this.prev()
        }
      }
    }
  }

  isOverflown({clientWidth, clientHeight, scrollWidth, scrollHeight}) {
    return scrollHeight > clientHeight || scrollWidth > clientWidth;
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
    if (!this.isMove) {
      this.setState({
        activeIndex: idx,
        pages: pages.map((p, i) => {
          if (i === idx) p.active = true
          else p.active = false
          return p
        })
      })
    }
  }

  move() {
    let {activeIndex} = this.state
    this.isMove = true
    Velocity(this.elContent, {
      translateY: `${activeIndex * -this.elContent.offsetHeight}px`,
    }, {
      duration: 700,
      complete: () => {
        this.isMove = false
      }
    })
    this.lastAnimation = new Date().getTime()
  }

  hamePageParallax() {
    let {activeIndex} = this.state
    let home = document.getElementById('home').getElementsByClassName('home')[0]
    if (activeIndex !== 0) {
      home.style.transform = 'translateY(100px)'
    } else {
      home.style.transform = 'translateY(0)'
    }
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
    let target = e.target
    if (target.closest('#products-row')) {
      if (this.isOverflown(target.closest('#products-container'))) return
    }
    if (target.closest('#contactus-row')) return
    if (this.isReallyTouch(e)) {
      if (!this.isMove) {
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

  animation() {
    let {activeIndex} = this.state
    let products = document.getElementById('products')
    let bounces = products.getElementsByClassName('bounce')
    if (activeIndex >= 1) {
      for (let i = 0; i < bounces.length; i++) {
        Velocity(bounces[i], {
          opacity: 1,
          translateY: 0
        }, {
          delay: 500
        })
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
          <CatalogsPage/>
          <AboutUsPage/>
          <ContactUsPage/>
        </div>
      </Fragment>
    )
  }
}
