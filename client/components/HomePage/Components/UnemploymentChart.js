import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
  fetchUnemployment,
  fetchGenderUnemployment
} from '../../../store/unemployment'
import {initUnempChart, drawUnempChart} from '../../D3Charts/UnempCirclePack'
// import {
//   drawGenderUnempChart,
//   initGenderUnempChart
// } from '../../D3Charts/BarPlot'
import {drawGenderUnempChart} from '../../D3Charts/StackedBarPlot'

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
    // initGenderUnempChart()
  }, [])

  const sortedGenderData = genderData.sort((a, b) => a.year - b.year)
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
          {isLoading ? drawGenderUnempChart(sortedGenderData) : <div />}
          {/* <button
            className="button"
            onClick={() => drawGenderUnempChart(sortedGenderData, 'avgMen')}
          >
            Men Unemployment
          </button>
          <button
            className="button"
            onClick={() => drawGenderUnempChart(sortedGenderData)}
          >
            Women Unemployment
          </button> */}
          <div id="genderUnempChart" />
        </div>
      </div>
    </div>
  )
}
