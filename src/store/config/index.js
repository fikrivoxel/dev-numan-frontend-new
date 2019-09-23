import dev from 'store/config/dev'
import prod from 'store/config/prod'
import {NODE_ENV} from 'globals.js'

const selectedConfigureStore = NODE_ENV === 'production' ? prod : dev

export const {configureStore, history} = selectedConfigureStore
