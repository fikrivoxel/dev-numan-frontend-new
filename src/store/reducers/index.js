import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router'
import modules from 'store/reducers/modules'

export default function createRootReducers(history) {
  return combineReducers({
    router: connectRouter(history),
    ...modules
  })
}
