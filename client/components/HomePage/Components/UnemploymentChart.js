import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
  fetchUnemployment,
  fetchGenderUnemployment
} from '../../../store/unemployment'
import {initUnempChart, drawUnempChart} from '../../D3Charts/UnempCirclePack'
import {drawGenderUnempChart, initStacked} from '../../D3Charts/StackedBarPlot'
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
    initStacked()
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
        </div>
        <div className="facts">
          <li>
            Difference Between Employed, Unemployed & Not In the Labor Force:
            "People who are jobless, looking for a job, and available for work
            are <u>unemployed</u>. The <u>labor force</u> is made up of the
            employed and the unemployed. People who are neither employed nor
            unemployed are <u>not in the labor force</u>." -Bureau of Labor
            Statistics
          </li>
          <li>
            The height of unemployment during the pandemic was in April and May
          </li>
          <li>
            "The COVID-19 outbreak and the economic downturn it engendered
            swelled the ranks of unemployed Americans by more than 14 million,
            from 6.2 million in February to 20.5 million in May 2020...The rise
            in the number of unemployed workers due to COVID-19 is substantially
            greater than the increase due to the Great Recession" -Pew Research
            Center
          </li>
          <li>
            Comparing unemployment data from The Great Recession to Covid-19 we
            found that the height of unemployment was in the 3 years after 2008,
            leading to the expectation that we could see the same in the years
            following the pandemic
          </li>
          <li>
            The unemployment rate has stayed relatively even along gender lines
            in 2020
          </li>
          <li>
            "labor-force participation usually falls in recessions. The lack of
            good-paying job opportunities prompt many of the unemployed to give
            up the job search...Many who have left the labor force had worked in
            low-wage sectors like retail, hospitality and personal care services
            disproportionately hit by the pandemic." -WSJ
          </li>
          <li>
            "...some economists see three reasons the pandemic’s depressing
            effect on the labor force could linger. First, it appears to have
            sped up some baby boomers’ decision to retire, shrinking the number
            of productive workers in the economy prematurely. Second, it is
            forcing some parents of young children, in particular women, to
            reduce their hours or stop working altogether, which could make a
            comeback harder. Third, it is falling particularly heavily on
            workers with less education and skills. These workers often struggle
            to find well-paying work and many drop out of the workforce." -WSJ
          </li>
          <li>
            Generally, women over 20 have higher rates of not being in the
            workforce, even pre-pandemic
          </li>
          <li>
            During some months of 2020 women over 20 dropped out the workforce
            at a higher rate than men but not at a strikingly signifigant
            percentage
          </li>
        </div>
      </div>
    </div>
  )
}
