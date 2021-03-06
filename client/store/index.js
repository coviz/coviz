import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import states from './states'
import usDataByDate from './usDataByDate'
import ethnicities from './ethnicity'
import ages from './age'
import genders from './gender'
import environments from './environment'
import unemployment from './unemployment'
import behindBarsReducer from './behindBarsReducer'
import hunger from './hunger'

const reducer = combineReducers({
  states,
  usDataByDate,
  ethnicities,
  genders,
  ages,
  unemployment,
  behindBarsReducer,
  hunger,
  environments
})

const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware))
const store = createStore(reducer, middleware)

export default store
export * from './states'
