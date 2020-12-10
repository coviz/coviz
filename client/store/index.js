import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import states from './states'
import usDataByDate from './usDataByDate'
import ethnicities from './ethnicity'
import genders from './gender'
import behindBarsReducer from './behindBarsReducer'

const reducer = combineReducers({
  states,
  usDataByDate,
  ethnicities,
  genders,
  behindBarsReducer
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './states'
