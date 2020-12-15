import axios from 'axios'

// action types
const GET_HUNGER_DATA = 'GET_HUNGER_DATA'

// action creators
export const fetchHungerData = data => ({
  type: GET_HUNGER_DATA,
  data
})

// thunk creators
export const fetchHungerDataThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`api/hunger`)
      //change data format
      let newObj = []
      for (let i = 0; i < data.length; i++) {
        newObj.push({
          year: data[i].year,
          black: data[i].blackFoodInsecurity,
          child: data[i].childrenFoodInsecurity,
          hispanic: data[i].hispanicFoodInsecurity,
          other: data[i].otherFoodInsecurity,
          all: data[i].overallFoodInsecurity,
          white: data[i].whiteFoodInsecurity
        })
      }
      dispatch(fetchHungerData(newObj))
    } catch (err) {
      console.error(err)
    }
  }
}

// initial state
const initialState = {
  isLoading: false,
  hungerData: []
}

// reducer
export default function hungerReducer(state = initialState, action) {
  switch (action.type) {
    case GET_HUNGER_DATA:
      return {...state, isLoading: true, hungerData: action.data}
    default:
      return state
  }
}
