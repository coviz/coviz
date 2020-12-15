import axios from 'axios'

// action types
const GET_ALL_DATE_DATA = 'GET_ALL_DATE_DATA'
const GET_CURRENT = 'GET_CURRENT'

// action creators
export const fetchAllDateData = data => ({
  type: GET_ALL_DATE_DATA,
  data
})
export const fetchCurrent = data => ({
  type: GET_CURRENT,
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
export const fetchAllCurentThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(
        'https://api.covidtracking.com/v1/us/current.json'
      )
      dispatch(fetchCurrent(data))
    } catch (error) {
      console.log(error)
    }
  }
}
// initial state
const initialState = {
  isLoading: false,
  usDailyData: [],
  currentData: {
    isLoading: true,
    data: []
  }
}

// reducer
export default function usDataByDateReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_DATE_DATA:
      return {...state, isLoading: true, usDailyData: action.data}
    case GET_CURRENT:
      return {
        ...state,
        currentData: {
          isLoading: false,
          data: action.data
        }
      }
    default:
      return state
  }
}
