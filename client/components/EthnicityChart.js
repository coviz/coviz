import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchEthnicities} from '../store/ethnicity'
import {initEthnChart, drawEthnChart} from './D3Charts/CirclePack'

export const EthnicityChart = props => {
  const dispatch = useDispatch()
  const data = useSelector(state => state.ethnicities.usData)
  const isLoading = useSelector(state => state.ethnicities.isLoading)

  useEffect(() => {
    dispatch(fetchEthnicities())
  }, [])
  useEffect(() => {
    initEthnChart(750, 700)
  }, [])

  return (
    <div>
      <h2 id="ethnTitle">Covid v. Ethnicity</h2>
      <div id="ethnPage">
        <div>
          {isLoading ? drawEthnChart(700, 800, data) : <div />}
          <div id="chartEthn">
            <div id="ethnChart" />
          </div>
        </div>
        <div className="factsEthn">
          <h4>
            <u>Ethnicity Insights:</u>
          </h4>
          <ul>
            <li>
              According to our data, African Americans, Native Americans, Pacfic
              Islanders and Latino Americans sufferd higher rates of death
              <sup className="smallsup">1</sup>
            </li>
            <li>
              "Pacific Islanders in US hospitalised with Covid-19 at up to 10
              times the rate of other groups, many islanders in America live in
              large families and tight-knit communities, and work in frontline
              service industries, increasing their risk of exposure"{' '}
              <sup className="smallsup">2</sup>
            </li>
            <li>
              "...the new studies do suggest that there is no innate
              vulnerability to the virus among Black and Hispanic
              Americans...Instead, these groups are more often exposed because
              of social and environmental factors..."{' '}
              <sup className="smallsup">3</sup>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
