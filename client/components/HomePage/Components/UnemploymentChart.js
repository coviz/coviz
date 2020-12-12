import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
  fetchUnemployment,
  fetchGenderUnemployment
} from '../../../store/unemployment'
import {initUnempChart, drawUnempChart} from '../../D3Charts/UnempCirclePack'
import {drawGenderUnempChart} from '../../D3Charts/StackedBarPlot'
import {drawGenderLaborChart, init} from '../../D3Charts/BarPlot'

export const UnemploymentChart = props => {
  const dispatch = useDispatch()
  const data = useSelector(state => state.unemployment.unemploymentData)
  const genderData = useSelector(state => state.unemployment.genderUnempData)
  const isLoading = useSelector(state => state.unemployment.isLoading)

  useEffect(() => {
    dispatch(fetchUnemployment())
    dispatch(fetchGenderUnemployment())
  }, [])
  useEffect(() => {
    initUnempChart(500, 500)
    init()
    // initGenderUnempChart()
  }, [])
  const newData = data.filter(elem => {
    return elem.year === '2020'
  })
  const sortedGenderData = genderData.sort((a, b) => a.year - b.year)
  console.log('this is new data', newData)
  console.log('this is data', data)
  return (
    <div>
      <h2 id="unempTitle">Covid v. Unemployment</h2>
      {isLoading ? drawUnempChart(500, 500, data) : <div />}
      <div id="genderPage">
        <div id="totalUnemp">
          <h4>Unemployment Chart Covid v. Great Recession</h4>
          <div id="unempChart" />
        </div>
        <div id="genderUnemp">
          <h4>Unemployment by Gender</h4>
          <div id="genderUnempChart" />
          {isLoading ? drawGenderUnempChart(sortedGenderData) : <div />}
        </div>
        <div id="notInLabor">
          <h4>Not in Labor Force by Gender</h4>
          {isLoading ? (
            drawGenderLaborChart(newData, 'notInLaborWomen')
          ) : (
            <div />
          )}
          {/* <button
            className="button"
            onClick={() => drawGenderLaborChart(newData, 'notInLaborMen')}
          >
            Men Not In Labor Force
          </button>
          <button
            className="button"
            onClick={() => drawGenderLaborChart(newData, 'notInLaborWomen')}
          >
            Women Not In Labor Force
          </button> */}
        </div>
      </div>
    </div>
  )
}
