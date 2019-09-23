import React, {Component, Fragment} from 'react'
import Header from 'components/partials/home/Header'
import HomePage from 'components/partials/home/HomePage'
import {PAGES} from 'globals.js'

export default class Home extends Component {
  state = {
    pages: PAGES
  }

  componentDidMount() {
    this.changeStyleBody()
  }

  changeStyleBody() {
    let root = document.getElementById('root')
    root.classList.add('root-fix')
  }

  render() {
    let {pages} = this.state
    return (
      <Fragment>
        <Header pages={pages}/>
        <HomePage/>
      </Fragment>
    )
  }
}
