import axios from 'axios'

const GET_UNEMPLOYMENT_DATA = 'GET_UNEMPLOYMENT_DATA'

const getUnemploymentData = data => {
  return {
    type: GET_UNEMPLOYMENT_DATA,
    data
  }
}

export const fetchUnemployment = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/unemployment')
      dispatch(getUnemploymentData(data))
    } catch (err) {
      console.log(err)
    }
  }
}
const initialState = {
  unemploymentData: [],
  isLoading: false
}
const unemploymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_UNEMPLOYMENT_DATA:
      return {...state, unemploymentData: action.data, isLoading: true}
    default:
      return state
  }
}
export default unemploymentReducer
