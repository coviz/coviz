import {expect} from 'chai'
import store from '.'
import {fetchAllDateData} from './usDataByDate'

describe('usDataByDate redux', () => {
  const data = [
    {
      state: 'California',
      statecode: 'CA',
      latitude: 38.576668,
      longitude: -121.493629,
      population: '39512223',
      date: 20201123,
      positive: 1110370
    },
    {
      state: 'California',
      statecode: 'CA',
      latitude: 38.576668,
      longitude: -121.493629,
      population: '39512223',
      date: 20201122,
      positive: 1102033
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
  it('fetchAllDateData action creator returns a valid action', () => {
    const example = fetchAllDateData(data)

    expect(fetchAllDateData(data)).to.deep.equal({
      type: 'GET_ALL_DATE_DATA',
      data
    })
  })
})
