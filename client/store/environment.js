import axios from 'axios'

const SET_ENVIRO = 'SET_ENVIRO'

export const setEnviro = co2Data => ({
  type: SET_ENVIRO,
  co2Data
})

export const fetchEnviro = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/environment')
      dispatch(setEnviro(data))
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = {
  co2Data: {},
  isLoading: false
}

export default function enviroReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ENVIRO:
      return {...state, co2Data: action.co2Data, isLoading: true}
    default:
      return state
  }
}
