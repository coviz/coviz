/** 
  Something to consider: you may not need Redux in every app you make. I would say this app doesn't necessarily need Redux since you only have about one action per data set. Consider cutting out Redux and using plain React state (either for this project, future data sets on this project, or future projects)
*/

/** 
  General note: this codebase has a fair amount of rogue console logs and unused imports. Don't forget to go back and clean these up before pushing to master. 
*/

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
      let mappedData = Object.keys(data[0])
        .map(ethnKey => {
          if (ethnKey.includes('Totals')) {
            return data[0][ethnKey]
          }
        })
        .filter(dataBit => {
          return dataBit !== undefined
        })

      console.log('mapped in thunk', mappedData)
      dispatch(setEthnicities(mappedData))
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
