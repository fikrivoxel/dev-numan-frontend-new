import {SET_COLLECTIONS, REMOVE_COLLECTIONS} from 'store/actions/collections'

const setCollections = function (state, collections) {
  
}
const removeCollections = function (state) {
  state = []
  return state
}

export default function reducers(state = [], actions) {
  switch (actions.type) {
    case SET_COLLECTIONS:
      return setCollections(state, actions.collections)
    case REMOVE_COLLECTIONS:
      return removeCollections(state)
    default:
      return state
  }
}