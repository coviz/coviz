import axios from 'axios'

// action types
const GET_SINGLE_DATE_DATA = 'GET_SINGLE_DATE_DATA'

// action creators
const fetchSingleDateData = data => ({
  type: GET_SINGLE_DATE_DATA,
  data
})

// thunk creators
export const fetchSingleDateDataThunk = date => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`api/covidDaily/${date}`)
      dispatch(fetchSingleDateData(data))
    } catch (err) {
      console.error(err)
    }
  }
}

// initial state
const initialState = []

// reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_DATE_DATA:
      return action.data
    default:
      return state
  }
}
