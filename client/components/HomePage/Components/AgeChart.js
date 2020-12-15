import React, {useEffect, useLayoutEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchAges} from '../../../store/age'
import {initAgeChart, drawAgeChart} from '../../D3Charts/Lollipop'

export const AgeChart = props => {
  const dispatch = useDispatch()

  const data = useSelector(state => state.ages.usData)
  const isLoading = useSelector(state => state.ages.isLoading)

  useEffect(() => {
    dispatch(fetchAges())
  }, [])
  useEffect(() => {
    initAgeChart(1000, 1000)
  }, [])

  return (
    <div>
      <h1 id="ageTitle1">Covid v. Age Groups</h1>
      {isLoading ? drawAgeChart(650, 600, data) : <div />}
      <div className="ageChartNinfo">
        <div style={{margin: 50}} id="ageChart" />
        <div className="ageFacts">
          <b id="ageTitle2">The Effect of COVID-19 on Different Age Groups</b>
          <br />
          <ul>
            <li>
              "Children, under the age of 18, to date, account for less than one
              percent of reported COVID-19 deaths" -Josh Michaud, kkf.org
            </li>
            {/* ^^source: https://www.kff.org/coronavirus-covid-19/issue-brief/what-do-we-know-about-children-and-coronavirus-transmission/ */}
            <li>
              "COVID-19 is not just hazardous for elderly people, it is
              extremely dangerous for people in their mid-fifties, sixties and
              seventies" -Andrew Levin, nature.com
            </li>
            {/* ^^source: https://www.nature.com/articles/d41586-020-02483-2 */}
            <li>
              "The risk of dying from coronavirus is also linked to underlying
              health conditions, the capacity of health-care systems, and
              whether the virus has spread among people living in elderly-care
              facilities." - Smriti Mallapaty, nature.com
            </li>
            {/* ^^source: https://www.nature.com/articles/d41586-020-02483-2 */}
          </ul>
        </div>
      </div>
    </div>
  )
}
