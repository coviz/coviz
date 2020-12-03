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
      const array = date.split('/')
      const year = array.pop()
      array.unshift(year)
      if (array[1].length <= 1) {
        let temp = array[1]
        array[1] = `0${temp}`
      }
      const newDate = array.join('')
      const {data} = await axios.get(`api/covidDaily/${newDate}`)
      console.log('thunk data', data)
      dispatch(fetchSingleDateData(data))
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
    case GET_SINGLE_DATE_DATA:
      return {...state, isLoading: true, usDailyData: action.data}
    default:
      return state
  }
}
