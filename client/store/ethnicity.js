import axios from 'axios'

const SET_ETHNICITIES = 'SET_ETHNICITIES'

export const setEthnicities = usData => ({
  type: SET_ETHNICITIES,
  usData
})

export const fetchEthnicities = () => {
  return async dispatch => {
    try {
      console.log('before axios')
      const {data} = await axios.get('/api/ethnicity')
      console.log('after axios')
      console.log('data in thunk rn:', data)
      // let mappedData = Object.keys(data[0])
      //   .map(ethnKey => {
      //     if (ethnKey.includes('Totals')) {
      //       return data[0][ethnKey]
      //     }
      //   })
      //   .filter(dataBit => {
      //     return dataBit !== undefined
      //   })

      // console.log('mapped in thunk', mappedData)
      dispatch(setEthnicities(data))
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = {
  usData: {},
  isLoading: false
}

export default function ethnicityReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ETHNICITIES:
      return {...state, usData: action.usData, isLoading: true}
    default:
      return state
  }
}
