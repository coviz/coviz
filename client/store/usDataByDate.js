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
      // const array = date.split('/')
      // const year = array.pop()
      // array.unshift(year)
      // if (array[1].length <= 1) {
      //   let temp = array[1]
      //   array[1] = `0${temp}`
      // }
      // if (array[2].length <= 1) {
      //   let temp = array[2]
      //   array[2] = `0${temp}`
      // }
      // const newDate = array.join('')
      const {data} = await axios.get(`api/covidDaily`)
      // console.log('thunk data', data)
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
