import axios from 'axios'

const SET_CASES_IN_JAILS = 'SET_CASES_IN_JAILS'

export const setCasesInJails = data => ({
  type: SET_CASES_IN_JAILS,
  data
})

export const fetchCasesInJails = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/behindBars')
      dispatch(setCasesInJails(data))
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = {
  data: {},
  isLoading: false
}

export default function behindBarsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CASES_IN_JAILS:
      return {...state, data: action.data, isLoading: true}
    default:
      return state
  }
}
