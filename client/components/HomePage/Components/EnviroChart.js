import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchEnviro} from '../../../store/environment'
import {initEnviroChart, drawEnviroChart} from '../../D3Charts/LineChart'

export const EnviroChart = (props) => {
  const dispatch = useDispatch()

  const data = useSelector((state) => state.environments.co2Data)
  const isLoading = useSelector((state) => state.environments.isLoading)

  useEffect(() => {
    dispatch(fetchEnviro())
  }, [])
  useEffect(() => {
    initEnviroChart(1000, 920)
  }, [])

  console.log('enviro data: ', data)
  return (
    <div>
      <h1 style={{color: '#F7D9C4'}}>Covid v. Environment</h1>
      {isLoading ? drawEnviroChart(840, 800, data) : <div />}
      <div className="co2ChartNinfo">
        <div id="enviroChart" />
        <div>
          <b>The Effect of COVID-19 on Carbon Emissions</b>
          <br />
          <ul className="co2Facts">
            <li>
              "The first half of 2020 saw an unprecedented decline in CO2
              emissions -- larger than during the financial crisis of 2008, the
              oil crisis of the 1979, or even World War II." -Zhu Liu,
              nature.com
            </li>
            <li>
              The biggest drop of carbon emissions in the US during 2020 so far
              occurred during April.
            </li>
            <li>
              "By July 1st, the pandemic’s effects on global emissions
              diminished as lockdown restrictions relaxed and some economic
              activities restarted, [...] with continuing emission declines in the U.S. where coronavirus
              cases are still increasing substantially." -Zhu Liu, nature.com
            </li>
            <li>
              "[There are] substantial COVID-related decreases in CO2 emissions between
              January 1st and June 30th of 2020 as compared to 2019. In the
              aggregate, emissions were 8.8% lower." -Zhu Liu, nature.com
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
