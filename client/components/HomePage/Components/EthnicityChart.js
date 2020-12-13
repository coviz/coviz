import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchEthnicities} from '../../../store/ethnicity'
import {initEthnChart, drawEthnChart} from '../../D3Charts/CirclePack'

export const EthnicityChart = props => {
  const dispatch = useDispatch()
  const data = useSelector(state => state.ethnicities.usData)
  const isLoading = useSelector(state => state.ethnicities.isLoading)

  useEffect(() => {
    dispatch(fetchEthnicities())
  }, [])
  useEffect(() => {
    initEthnChart(600, 800)
  }, [])

  return (
    <div>
      <div>
        <h2>Covid v. Ethnicity</h2>
        {isLoading ? drawEthnChart(700, 800, data) : <div />}
        <div id="ethnChart" />
        <div id="ethnLegend" />
      </div>
      <div className="facts">
        <ul>
          <li>
            Accoring to our data African Americans, Native Americans, Pacfic
            Islanders and Latino Americans sufferd higher rates of death
          </li>
          <li>
            "Pacific Islanders in US hospitalised with Covid-19 at up to 10
            times the rate of other groups, many islanders in America live in
            large families and tight-knit communities, and work in frontline
            service industries, increasing their risk of exposure" -The Guardian{' '}
          </li>
          <li>
            "American Indian and Alaska Native people have died in connection
            with COVID-19 at nearly twice the rate of white people in a sample
            of 14 states, according to a new analysis published by the Centers
            for Disease Control and Prevention" -US News
          </li>
          <li>
            "...But the new studies do suggest that there is no innate
            vulnerability to the virus among Black and Hispanic
            Americans...Instead, these groups are more often exposed because of
            social and environmental factors...<br /> Among many other
            vulnerabilities, Black and Hispanic communities and households tend
            to be more crowded; many people work jobs requiring frequent contact
            with others and rely on public transportation.Access to health care
            is poorer than among white Americans, and rates of underlying
            conditions are much higher." -The NYT
          </li>
        </ul>
      </div>
    </div>
  )
}
