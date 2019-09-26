import React, {Component} from 'react'
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'
import {isEmpty} from 'lodash'

export default class Filter extends Component {
  state = {
    isOpen: false,
    sortName: [
      'Urutkan berderdasarkan abjad (A-Z)',
      'Urutkan berderdasarkan abjad (Z-A)',
      'Urutkan dari harga termahal',
      'Urutkan dari harga termurah'
    ]
  }

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    let {isOpen} = this.state
    this.setState({
      isOpen: !isOpen
    })
  }

  DDMap() {
    let {sortName} = this.state
    let sortMap = sortName.map((s, i) => (
      <DropdownItem onClick={() => this.props.changesort(i)} key={i}>
        {s}
      </DropdownItem >
    ))
    return (
      <DropdownMenu className='filter-sort-dropdown'>
        {sortMap}
      </DropdownMenu>
    )
  }

  render() {
    let {isOpen, sortName} = this.state
    let {sort} = this.props
    return (
      <div className='filter'>
        <Dropdown isOpen={isOpen} className='filter-sort' toggle={this.toggle}>
          <DropdownToggle  type='button' className='btn filter-sort-btn'>
            {isEmpty(sortName[sort]) ? 'Sort' : `Sort: ${sortName[sort]}`}
          </DropdownToggle>
          {this.DDMap()}
        </Dropdown>
        <div className='btn-group ml-auto'>
          <button type='button' className='btn filter-grid-btn' onClick={() => this.props.changegrid(0)}>
            <i className='fon fon-w fon-th-mini' />
          </button>
          <button type='button' className='btn filter-grid-btn' onClick={() => this.props.changegrid(1)}>
            <i className='fon fon-w fon-th-full' />
          </button>
        </div>
      </div>
    )
  }
}
