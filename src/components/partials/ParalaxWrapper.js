import React, {Component, createRef} from 'react'

export default class ParalaxWrapper extends Component {
  div = createRef()
  update = 6
  css = {
    warp: {
      position: 'relative',
      transition: 'transform .2s linear',
      willChange: 'transform',
      transform: 'translateY(var(--ty, 0)) rotateX(var(--rx, 0)) rotateY(var(--ry, 0)) translateZ(var(--tz, -1em))'
    }
  }

  constructor(props) {
    super(props)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
  }

  onMouseMove(e) {
    if (this.update === 6) {
      this.boundingRect = this.div.getBoundingClientRect()
      let dx = e.clientX - this.boundingRect.left - this.boundingRect.width / 2;
      let dy = e.clientY - this.boundingRect.top - this.boundingRect.height / 2;
      this.div.style.setProperty('--rx', `${(-dy / 2) * this.props.parallaxScale}deg`)
      this.div.style.setProperty('--ry', `${(dx / 4) * this.props.parallaxScale}deg`)
      this.update = 0
    }
    this.update++
  }

  onMouseLeave() {
    this.div.style.setProperty('--ty', '0')
    this.div.style.setProperty('--rx', '0')
    this.div.style.setProperty('--ry', '0')
  }

  render() {
    return (
      <div
        onMouseMove={this.onMouseMove}
        onMouseLeave={this.onMouseLeave}
      >
        <div
          style={this.css.warp}
          ref={ref => this.div = ref}
        >
          {this.props.children}
        </div>
      </div>
    )
  }
}
