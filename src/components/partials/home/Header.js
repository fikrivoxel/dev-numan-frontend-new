import React, {Component} from 'react'
import {isEmpty} from 'lodash'
import {VelocityTransitionGroup} from 'velocity-react'


export default class Header extends Component {
  sosmed = [
    {name: 'twitter', url: 'https://twitter.com'},
    {name: 'facebook', url: 'https://www.facebook.com'},
    {name: 'instagram', url: 'https://www.instagram.com'},
    {name: 'googleplus', url: 'https://www.google.com'},
    {name: 'linkedin', url: 'https://www.linkedin.com'}
  ]

  sosmedMap() {
    return this.sosmed.map((s, i) => (
      <li className='header-nav-item' key={i}>
        <a href={s.url} className='header-nav-link'>
          <i className={`fon fon-w fon-${s.name}`}/>
        </a>
      </li>
    ))
  }

  titlePagesMap() {
    let {pages} = this.props
    let pagesMap = pages.map((p, i) => {
      let text = (
        <div className='header-title-text' key={i}>
          <h1>{p.name}</h1>
          {!isEmpty(p.title.caption) && (<div className='header-title-caption'>{p.title.caption}</div>)}
        </div>
      )
      let img = (
        <div className='header-title-img' key={i}>
          <img src={p.title.image} alt={p.name}/>
        </div>
      )
      return p.active && (p.title.type === 'text' ? text : img)
    })
    return (
      <VelocityTransitionGroup
        enter={{animation: {translateY: 0, opacity: 1}, delay: 500}}
        leave={{animation: {translateY: 20, opacity: 0}}}
        className='header-title'>
        {pagesMap}
      </VelocityTransitionGroup>
    )
  }

  render() {
    return (
      <header className='header' id='header'>
        <nav className='header-nav'>
          <ul className='header-nav-menu'>
            {this.sosmedMap()}
          </ul>
        </nav>
        {this.titlePagesMap()}
      </header>
    )
  }
}
