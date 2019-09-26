import React, {Component} from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {isEqual, capitalize} from 'lodash'

const mapStateToProps = function (state) {
  return {
    catalogs: state.catalogs,
    collections: state.collections
  }
}

class Grid extends Component {
  state = {
    catalogs: this.props.catalogs
  }
  winWidth = window.innerWidth

  componentDidMount() {
    this.filterParams()
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.catalogs, this.props.catalogs)) {
      this.setState({
        catalogs: this.props.catalogs
      })
    }
    if (!isEqual(prevProps.sort, this.props.sort)) {
      this.filter()
    }
    if (!isEqual(prevProps.params, this.props.params)) {
      this.filterParams()
    }
  }

  filterParams() {
    let {params, catalogs} = this.props
    let c = params === '' ? catalogs : catalogs.filter((c) => {
      return c.collection_url === params
    })
    this.setState({
      catalogs: c
    })
  }

  filter() {
    let {catalogs} = this.state
    let {sort} = this.props
    this.setState({
      catalogs: catalogs.sort((a, b) => {
        let nameA = a.name.toUpperCase(), nameB = b.name.toUpperCase()
        if (sort === 0) {
          if (nameA < nameB) return -1
          if (nameA > nameB) return 1
          return 0
        } else if (sort === 1) {
          if (nameA > nameB) return -1
          if (nameA < nameB) return 1
          return 0
        } else if (sort === 2) {
          return b.price - a.price
        } else if (sort === 3) {
          return a.price - b.price
        } else return 0
      })
    })
  }

  coloursMap(cat) {
    let {colors} = cat
    let jus = this.winWidth >= 768 ? '' : 'flex-wrap'
    let c = colors.map((cl, i) => {
      return (
        <div className={`box-grid-colors`} style={{width: 100 / colors.length + '%'}} key={i}>
          {capitalize(cl.color)}
        </div>
      )
    })
    return (
      <div className={`box-grid-colors-warp d-flex ${jus}`}>
        {c}
      </div>
    )
  }

  catalogsMap() {
    let {catalogs} = this.state
    let {typegrid} = this.props
    return catalogs.map((c, i) => {
      return (
        <div className={`${typegrid === 0 ? 'col-xl-4 col-md-4 col-6' : 'col-12'} animate-width`} key={i}>
          <Link to={`catalogs/${c.id}`} className={`box-grid box-${typegrid === 0 ? 'mini' : 'full'}`}>
            <div className='box-grid-img-overlay'>
              <img src={c.images[0]} alt={c.name} className='box-grid-img'/>
            </div>
            <div className='box-grid-desc'>
              <div className='box-grid-desc-name'>
                <span style={{display: 'block'}}>{c.name}</span>
                <small className='box-name-price'>Rp. {c.price}</small>
              </div>
              <div style={{padding: '10px 0'}} className='box-grid-desc-tag'>
                <div className='box-grid-price'>
                  <dl className='row mb-0'>
                    <dt className='col-md-2'>Price</dt>
                    <dd className='col-md-10'>Rp. {c.price}</dd>
                    <dt className='col-md-2'>Colors</dt>
                    <dd className='col-md-10'>
                      {this.coloursMap(c)}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )
    })
  }

  render() {
    return (
      <div className='row'>
        {this.catalogsMap()}
      </div>
    )
  }
}

export default compose(
  connect(mapStateToProps)
)(Grid)
