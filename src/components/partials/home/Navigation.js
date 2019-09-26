import React, {Component} from 'react'

export default class Navigation extends Component {
  navigationMenu() {
    let {pages, gotoidx} = this.props
    let menu = pages.map((p, i) => {
      let active = p.active ? 'active' : ''
      return (
        <li className={active} key={i}>
          <button type='button' className={`navigation-link ${active}`} onClick={() => gotoidx(i)}>
            {p.name}
          </button>
        </li>
      )
    })
    return (
      <ul className='navigation-menu'>
        {menu}
        <li className='dumb'/>
      </ul>
    )
  }

  render() {
    return (
      <div className='navigation'>
        {this.navigationMenu()}
      </div>
    )
  }
}
