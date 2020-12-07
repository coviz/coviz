import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import states from './states'
<<<<<<< HEAD
import ethnicities from './ethnicity'

const reducer = combineReducers({states, ethnicities})
=======
import usDataByDate from './usDataByDate'
import ethnicities from './ethnicity'

const reducer = combineReducers({states, usDataByDate, ethnicities})

>>>>>>> main
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './states'
