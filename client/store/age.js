import axios from 'axios'

const SET_AGES = 'SET_AGES'

export const setAges = usData => ({
  type: SET_AGES,
  usData
})

export const fetchAges = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/age')

      dispatch(setAges(data))
    } catch (error) {
      console.error(error)
    }
  }
}

const initialState = {
  usData: {},
  isLoading: false
}

export default function ageReducer(state = initialState, action) {
  switch (action.type) {
    case SET_AGES:
      return {...state, usData: action.usData, isLoading: true}
    default:
      return state
  }
}
