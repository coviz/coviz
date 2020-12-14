import {expect} from 'chai'
import store from './index'
import {fetchEthnicities} from './ethnicity'

describe('ethnicity redux', () => {
  const data = [
    {
      state: 'California',
      ethnicity: 'AsianAmerican',
      deaths: 1200,
      pop: 32000002,
      percentage: '0.03'
    },
    {
      state: 'Kentucky',
      ethnicity: 'AsianAmerican',
      deaths: 120,
      pop: 3200000,
      percentage: '0.04'
    }
  ]
  it('returns initial state by default', () => {
    const initialState = store.getState()
    store.dispatch({type: ''})
    expect(store.getState()).to.equal(initialState)
  })
  it('isLoading property of initial state is false', () => {
    store.dispatch({type: ''})
    expect(store.getState().usDataByDate.isLoading).to.equal(false)
  })
  it('fetchEthnicities action creator returns a valid action', () => {
    const example = fetchEthnicities(data)

    expect(fetchEthnicities(data)).to.deep.equal({
      type: 'SET_ETHNICITIES',
      usData
    })
  })
})
