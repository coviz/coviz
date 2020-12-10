import axios from 'axios'

const GET_GENDER_DATA = 'GET_GENDER_DATA'

const getGenderData = data => {
  return {
    type: GET_GENDER_DATA,
    data
  }
}

export const fetchGenderData = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/agesex/gender')
      dispatch(getGenderData(data))
    } catch (err) {
      console.error(err)
    }
  }
}

const initialState = {
  genderData: [],
  isLoading: false
}

const genderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GENDER_DATA:
      return {...state, genderData: action.data, isLoading: true}
    default:
      return state
  }
}

export default genderReducer
