import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {createHashHistory} from 'history'
import {routerMiddleware} from 'connected-react-router'
import createRootReducer from 'store/reducers'

const history = createHashHistory()
const rootReducer = createRootReducer(history)
const router = routerMiddleware(history)
const enhancer = applyMiddleware(thunk, router)
const configureStore = function (initialState) {
  return createStore({
    rootReducer,
    initialState,
    enhancer
  })
}

export default { configureStore, history }
