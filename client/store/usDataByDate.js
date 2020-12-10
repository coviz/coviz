import axios from 'axios'

// action types
const GET_ALL_DATE_DATA = 'GET_ALL_DATE_DATA'

// action creators
export const fetchAllDateData = data => ({
  type: GET_ALL_DATE_DATA,
  data
})

// thunk creators
export const fetchAllDateDataThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`api/covidDaily`)
      dispatch(fetchAllDateData(data))
    } catch (err) {
      console.error(err)
    }
  }
}

// initial state
const initialState = {
  isLoading: false,
  usDailyData: []
}

// reducer
export default function usDataByDateReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_DATE_DATA:
      return {...state, isLoading: true, usDailyData: action.data}
    default:
      return state
  }
}
