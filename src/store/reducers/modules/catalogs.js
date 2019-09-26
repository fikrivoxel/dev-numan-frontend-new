import {SET_CATALOGS, REMOVE_CATALOGS} from 'store/actions/catalogs'

const setCatalogs = function (state, catalogs) {
  state = catalogs
  return state
}
const removeCatalogs = function (state) {
  state = []
  return state
}

export default function reducers(state = [], actions) {
  switch (actions.type) {
    case SET_CATALOGS:
      return setCatalogs(state, actions.catalogs)
    case REMOVE_CATALOGS:
      return removeCatalogs(state)
    default:
      return state
  }
}
