import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchEnviro} from '../store/environment'
import {initEnviroChart, drawEnviroChart} from './D3Charts/LineChart'

export const EnviroChart = props => {
  const dispatch = useDispatch()

  const data = useSelector(state => state.environments.co2Data)
  const isLoading = useSelector(state => state.environments.isLoading)

  useEffect(() => {
    dispatch(fetchEnviro())
  }, [])
  useEffect(() => {
    initEnviroChart(1000, 920)
  }, [])

  return (
    <div className="envStuff">
      <h1 id="enviroTitle1">Covid v. Environment</h1>
      {isLoading ? drawEnviroChart(840, 800, data) : <div />}
      <div className="co2ChartNinfo">
        <div id="enviroChart" />
        <div className="co2Facts">
          <b id="enviroTitle2">The Effect of COVID-19 on Carbon Emissions</b>
          <br />
          <ul>
            <li>
              "The first half of 2020 saw an unprecedented decline in CO2
              emissions -- larger than during the financial crisis of 2008, the
              oil crisis of the 1979, or even World War II."{' '}
              <sup className="smallsup">12</sup>
            </li>
            <li>
              The biggest drop of carbon emissions in the US during 2020 so far
              occurred during April.
            </li>
            <li>
              "[There are] substantial COVID-related decreases in CO2 emissions
              between January 1st and June 30th of 2020 as compared to 2019. In
              the aggregate, emissions were 8.8% lower."{' '}
              <sup className="smallsup">12</sup>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
