import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {fetchCasesInJails} from '../store/behindBarsReducer'

import {SpikeMap} from './D3Charts/SpikeMap'

export const BehindBars = () => {
  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.behindBarsReducer.isLoading)
  let allCases = useSelector(state => state.behindBarsReducer.data)
  const [data, setData] = useState([])

  useEffect(() => {
    dispatch(fetchCasesInJails())
  }, [])
  useEffect(
    () => {
      //if it's no longer loding
      if (!isLoading) {
        allCases = allCases.map(element => {
          return {
            id: element.id,
            long: Number(element.longitude),
            lat: Number(element.latitude),
            confirmedResidents: Number(element.confirmedResidents)
          }
        })
        setData(allCases)
      }
    },
    [isLoading]
  )
  return <div>{isLoading ? <div /> : <SpikeMap realData={data} />}</div>
}