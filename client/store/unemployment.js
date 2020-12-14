import axios from 'axios'
import {act} from 'react-test-renderer'

const GET_UNEMPLOYMENT_DATA = 'GET_UNEMPLOYMENT_DATA'
const GET_GENDER_UNEMPLOYMENT_DATA = 'GET_GENDER_UNEMPLOYMENT_DATA'

const getUnemploymentData = data => {
  return {
    type: GET_UNEMPLOYMENT_DATA,
    data
  }
}

const getGenderUnemploymentData = genderData => {
  return {
    type: GET_GENDER_UNEMPLOYMENT_DATA,
    genderData
  }
}
export const fetchUnemployment = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/unemployment')
      dispatch(getUnemploymentData(data))
    } catch (err) {
      // console.log(err)
    }
  }
}
export const fetchGenderUnemployment = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/unemployment/gender')
      dispatch(getGenderUnemploymentData(data))
    } catch (err) {
      // console.log(err)
    }
  }
}
const initialState = {
  unemploymentData: [],
  genderUnempData: [],
  isLoading: false
}
const unemploymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_UNEMPLOYMENT_DATA:
      return {...state, unemploymentData: action.data, isLoading: true}
    case GET_GENDER_UNEMPLOYMENT_DATA:
      return {...state, genderUnempData: action.genderData, isLoading: true}
    default:
      return state
  }
}
export default unemploymentReducer
