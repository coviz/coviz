import axios from 'axios'

// action types
const GET_HUNGER_DATA = 'GET_HUNGER_DATA'

// action creators
export const fetchHungerData = data => ({
  type: GET_HUNGER_DATA,
  data
})

// thunk creators
export const fetchHungerDataThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`api/hunger`)
      dispatch(fetchHungerData(data))
    } catch (err) {
      console.error(err)
    }
  }
}

// initial state
const initialState = {
  isLoading: false,
  hungerData: []
}

// reducer
export default function hungerReducer(state = initialState, action) {
  switch (action.type) {
    case GET_HUNGER_DATA:
      return {...state, isLoading: true, hungerData: action.data}
    default:
      return state
  }
}
