import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {fetchCasesInJails} from '../store/behindBarsReducer'
// import {BehindBarsMap} from './BehindBarsMap'
import {Temp} from './temp'

export const BehindBars = () => {
  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.behindBarsReducer.isLoading)
  const allCases = useSelector(state => state.behindBarsReducer.data)
  const [data, setData] = useState([])

  useEffect(() => {
    console.log('inside first useEffect')
    dispatch(fetchCasesInJails())
  }, [])
  useEffect(
    () => {
      //if it's not longer loding
      console.log('inside second useEffect', isLoading)
      if (!isLoading) {
        setData(allCases)
        console.log('data after second useEffect', data)
      }
    },
    [isLoading]
  )
  return <div>{!isLoading ? <Temp realData={data} /> : <div />}</div>
}
