import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class Header extends Component {
  render() {
    let {isopen, toggleopen} = this.props
    return (
      <header className='header-normal'>
        <Link to='/' className='header-normal-title'>
          <img src='/images/logo.png' alt='logo' className='header-normal-title-img'/>
        </Link>
        <div className='header-normal-btn'>
          <button type='button' className={`btn btn-toggle-menu ${isopen ? 'active' : ''}`} onClick={toggleopen}>
            <div className='menu-icon'>
              <span />
              <span />
              <span />
            </div>
          </button>
        </div>
      </header>
    )
  }
}
