import React from 'react'

export const About = () => {
  return (
    <div id="about">
      <h3>About coviz</h3>
      <p>
        coviz is a data visualization application that takes COVID-19 related
        data from multiple sources to draw insights about how the virus has
        affected certain spaces and demographics within the U.S.
      </p>
      <div className="sources">
        <h3>Sources</h3>
        <ul>
          <h4>Unemployment</h4>
          <li>
            Unemployment Data, Bureau of Labor Statistics, Employment status of
            the civilian population by sex and age, Not Seasonally Adjusted:{' '}
            <u>
              <a href="https://www.bls.gov/webapps/legacy/cpsatab1.htm">
                https://www.bls.gov/webapps/legacy/cpsatab1.htm
              </a>
            </u>
          </li>
          <li>
            Covid Shrinks the Labor Market, Pushing Out Women and Baby Boomers,
            The Wall Street Journal:<u>
              <a href="https://www.wsj.com/articles/covid-shrinks-the-labor-market-pushing-out-women-and-baby-boomers-11607022074">
                https://www.wsj.com/articles/covid-shrinks-the-labor-market-pushing-out-women-and-baby-boomers-11607022074
              </a>
            </u>
          </li>
          <li>
            Unemployment rose higher in three months of COVID-19 than it did in
            two years of the Great Recession, Pew Research Center:<u>
              <a href="https://www.pewresearch.org/fact-tank/2020/06/11/unemployment-rose-higher-in-three-months-of-covid-19-than-it-did-in-two-years-of-the-great-recession/">
                https://www.pewresearch.org/fact-tank/2020/06/11/unemployment-rose-higher-in-three-months-of-covid-19-than-it-did-in-two-years-of-the-great-recession/
              </a>
            </u>
          </li>
          <h4>Ethnicity</h4>
          <li>
            Ethnicity Data, Centers for Disease Control and Prevention (CDC) ,
            Provisional Death Counts for Coronavirus Disease (COVID-19):
            Distribution of Deaths by Race and Hispanic Origin:{' '}
            <u>
              <a href="https://data.cdc.gov/NCHS/Provisional-Death-Counts-for-Coronavirus-Disease-C/pj7m-y5uh">
                https://data.cdc.gov/NCHS/Provisional-Death-Counts-for-Coronavirus-Disease-C/pj7m-y5uh
              </a>
            </u>
          </li>
          <li>
            Ethnicity Data, United States Census Bureau, State Population by
            Characteristics: 2010-2019: Age, Sex, Race, and Hispanic Origin - 6
            race groups:{' '}
            <u>
              <a href="https://www.census.gov/data/tables/time-series/demo/popest/2010s-state-detail.html">
                https://www.census.gov/data/tables/time-series/demo/popest/2010s-state-detail.html
              </a>
            </u>
          </li>
          <li>
            Pacific Islanders in US hospitalised with Covid-19 at up to 10 times
            the rate of other groups, The Guardian:{' '}
            <u>
              <a href="https://www.theguardian.com/world/2020/jul/27/system-is-so-broken-covid-19-devastates-pacific-islander-communities-in-us">
                https://www.theguardian.com/world/2020/jul/27/system-is-so-broken-covid-19-devastates-pacific-islander-communities-in-us
              </a>
            </u>
          </li>
          <li>
            Study: COVID-19 Mortality Twice as High Among Native Americans, U.S.
            News:{' '}
            <u>
              <a href="https://www.usnews.com/news/health-news/articles/2020-12-10/covid-mortality-twice-as-high-among-native-americans-than-whites">
                https://www.usnews.com/news/health-news/articles/2020-12-10/covid-mortality-twice-as-high-among-native-americans-than-whites
              </a>
            </u>
          </li>
          <li>
            Social Inequities Explain Racial Gaps in Pandemic, Studies Find, The
            New York Times:{' '}
            <u>
              <a href="https://www.nytimes.com/2020/12/09/health/coronavirus-black-hispanic.html">
                https://www.nytimes.com/2020/12/09/health/coronavirus-black-hispanic.html
              </a>
            </u>
          </li>
          <h4>Age & Gender</h4>
          <li>
            Age & Gender Data, Centers for Disease Control and Prevention (CDC)
            , Provisional COVID-19 Death Counts by Sex, Age, and State:{' '}
            <u>
              <a href="https://data.cdc.gov/NCHS/Provisional-COVID-19-Death-Counts-by-Sex-Age-and-S/9bhg-hcku">
                https://data.cdc.gov/NCHS/Provisional-COVID-19-Death-Counts-by-Sex-Age-and-S/9bhg-hcku
              </a>
            </u>
          </li>
          <li>
            Experiences with the COVID-19 outbreak can vary for Americans of different ages, article:{' '}
            <u>
              <a href="https://www.pewresearch.org/fact-tank/2020/06/16/experiences-with-the-covid-19-outbreak-can-vary-for-americans-of-different-ages/">
                https://www.pewresearch.org/fact-tank/2020/06/16/experiences-with-the-covid-19-outbreak-can-vary-for-americans-of-different-ages/
              </a>
            </u>
          </li>
          <li>
            What Do We Know About Children and Coronavirus Transmission?, Article:{' '}
            <u>
              <a href="https://www.kff.org/coronavirus-covid-19/issue-brief/what-do-we-know-about-children-and-coronavirus-transmission/">
                https://www.kff.org/coronavirus-covid-19/issue-brief/what-do-we-know-about-children-and-coronavirus-transmission/
              </a>
            </u>
          </li>
          <h4>Environment</h4>
          <li>
            Carbon dioxide emissions from energy consumption, Data on Monthly CO2 in the United States:{' '}
            <u>
              <a href="https://www.eia.gov/totalenergy/data/monthly/?fbclid=IwAR2lMC9dDh2sShSVCFNVxOh39_IdZY54N_hXFRrAWOp4YVahcZ5H_zXTY40">
                https://www.eia.gov/totalenergy/data/monthly/?fbclid=IwAR2lMC9dDh2sShSVCFNVxOh39_IdZY54N_hXFRrAWOp4YVahcZ5H_zXTY40
              </a>
            </u>
          </li>
          <li>
            Near-real-time monitoring of global CO2 emissions reveals the effects of the COVID-19 pandemic, Academic Journal:{' '}
            <u>
              <a href="https://www.nature.com/articles/s41467-020-18922-7">
                https://www.nature.com/articles/s41467-020-18922-7
              </a>
            </u>
          </li>
        </ul>
      </div>
    </div>
  )
}
