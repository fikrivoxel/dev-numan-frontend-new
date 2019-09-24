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

  constructor(props) {
    super(props)
    this.mouseWheel = this.mouseWheel.bind(this)
    this.gotoIndex = this.gotoIndex.bind(this)
  }

  componentDidMount() {
    this.bodyFix()
    document.addEventListener('mousewheel', this.mouseWheel)
    document.addEventListener('wheel', this.mouseWheel)
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.activeIndex !== this.state.activeIndex) {
      this.move()
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousewheel', this.mouseWheel)
    document.removeEventListener('wheel', this.mouseWheel)
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

  move() {
    let {activeIndex} = this.state
    Velocity(this.elContent, {
      translateY: `${activeIndex * -this.elContent.offsetHeight}px`,
    }, {
      duration: 700
    })
  }

  render() {
    let {pages} = this.state
    return (
      <Fragment>
        <Header pages={pages}/>
        <Navigation pages={pages} gotoidx={this.gotoIndex} />
        <div className='root-content' ref={el => this.elContent = el}>
          <HomePage gotoidx={() => this.gotoIndex(1)} />
          <ProductsPage/>
        </div>
      </Fragment>
    )
  }
}
