import React, {Component} from 'react'
import {compose, bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {isEmpty, has, isEqual} from 'lodash'
import Filter from 'components/partials/products/listgrid/Filter'
import Grid from 'components/partials/products/listgrid/Grid'
import {getAll, getByCollections} from 'store/actions/catalogs'

const mapStateToProps = function (state) {
  let {collections, catalogs} = state
  return {collections, catalogs}
}

const mapDispatchToProps = function (dispatch) {
  return bindActionCreators({getByCollections, getAll}, dispatch)
}

class ListGrid extends Component {
  state = {
    params: '',
    sort: 4,
    typeGrid: 0
  }

  constructor(props) {
    super(props)
    this.changeTypeGrid = this.changeTypeGrid.bind(this)
    this.changeSort = this.changeSort.bind(this)
  }


  async componentDidMount() {
    this.changeParams()
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (!isEqual(this.props.match, prevProps.match)) {
      this.changeParams()
    }
    if (!isEqual(this.state.params, prevState.params) || !isEqual(this.props.collections, prevProps.collections)) {
      this.ajaxCall()
    }
  }

  changeParams() {
    let {match} = this.props
    this.setState({
      params: (isEmpty(match.params) || !has(match.params, 'url') ? '' : match.params.url)
    })
  }

  changeTypeGrid(type) {
    this.setState({
      typeGrid: type
    })
  }

  changeSort(type) {
    this.setState({
      sort: type
    })
  }

  async ajaxCall() {
    let {params} = this.state
    let {getByCollections, getAll, collections} = this.props
    try {
      if (isEmpty(params)) {
        await getAll()
      } else {
        let find = collections.find(c => c.url === params)
        await getByCollections(find)
      }
    } catch (e) {}
  }

  render() {
    let {typeGrid, sort, params} = this.state
    return (
      <div className='row'>
        <div className='col-12'>
          <Filter changegrid={this.changeTypeGrid} changesort={this.changeSort} sort={sort} />
        </div>
        <div className='col-12' style={{marginTop: 20}}>
          <Grid typegrid={typeGrid} sort={sort} params={params}/>
        </div>
      </div>
    )
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(ListGrid)
