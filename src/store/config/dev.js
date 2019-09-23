import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {createHashHistory} from 'history'
import {routerMiddleware, routerActions} from 'connected-react-router'
import {createLogger} from 'redux-logger'
import createRootReducer from 'store/reducers'
import * as collectionsActions from 'store/actions/collections'
import {NODE_ENV} from 'globals'

const history = createHashHistory()
const rootReducer = createRootReducer(history)
const configureStore = function (initialState) {
  let middleware = [], enhancers = []
  middleware.push(thunk)
  let logger = createLogger({
    level: 'info',
    collapsed: true
  })
  if (NODE_ENV !== 'test') middleware.push(logger)
  let router = routerMiddleware(history)
  middleware.push(router)
  let actionsCreators = {
    ...collectionsActions,
    ...routerActions
  }
  let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      actionsCreators
    }) : compose
  enhancers.push(applyMiddleware(...middleware))
  let enhancer = composeEnhancers(...enhancers)

  return createStore(rootReducer, initialState, enhancer)
}

export default {configureStore, history}
