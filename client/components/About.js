import React from 'react'

export const About = () => {
  return (
    <div id="about">
      <div className="aboutDetails">
        <h3 id="aboutTitle">About Coviz</h3>
        <p>
          Coviz is an interactive data visualization of the impact of COVID-19
          over time in the United States, including how it intersects with a
          variety of key issues. We created Coviz as our capstone project during
          the Grace Hopper Program at Fullstack Academy. It highlights how case
          counts and deaths have changed in each state since COVID-19 began, and
          offers users the opportunity to explore how COVID-19 has impacted
          demographic groups (age, race & ethnicity, gender, and prison
          populations) as well as social and economic issues (unemployment,
          hunger, and the environment).
        </p>
        <p>
          We hope that you find Coviz interesting and insightful, and that it
          can be a tool for you to use in considering which demographics and
          social problems have been impacted the most by the COVID-19 pandemic.
        </p>
        <p>
          The site uses D3 to render the main map and supplemental charts,
          coupled with React and Redux for the front end. Additionally, the site
          uses express, sequelize, and SQL for the backend and stores data in a
          PostgreSQL database. The javascript libraries fast-csv and
          node-postgres (pg) are used to help read our data files and store the
          read data in PostgreSQL. To ensure everything is working as expected,
          code is tested using the Chai BDD/TDD assertion library.
        </p>
      </div>
      <div className="sources">
        <h3>Sources</h3>
        <div />
        <ul>
          <h4>HOMEPAGE </h4>
          <h5> U.S. Bubble Map: </h5>
          <li>
            Covid-19 Data, The Covid Tracking Project, The Atlantic:{' '}
            <u>
              <a href="https://covidtracking.com/data" target="_blank">
                https://covidtracking.com/data
              </a>
            </u>
          </li>
          <h4>RACE & ETHNICITY</h4>
          <li>
            1. Study: COVID-19 Mortality Twice as High Among Native Americans,
            U.S. News:{' '}
            <u>
              <a
                href="https://www.usnews.com/news/health-news/articles/2020-12-10/covid-mortality-twice-as-high-among-native-americans-than-whites"
                target="_blank"
              >
                https://www.usnews.com/news/health-news/articles/2020-12-10/covid-mortality-twice-as-high-among-native-americans-than-whites
              </a>
            </u>
          </li>
          <li>
            2. Pacific Islanders in US hospitalised with Covid-19 at up to 10
            times the rate of other groups, The Guardian:{' '}
            <u>
              <a
                href="https://www.theguardian.com/world/2020/jul/27/system-is-so-broken-covid-19-devastates-pacific-islander-communities-in-us"
                target="_blank"
              >
                https://www.theguardian.com/world/2020/jul/27/system-is-so-broken-covid-19-devastates-pacific-islander-communities-in-us
              </a>
            </u>
          </li>

          <li>
            3. Social Inequities Explain Racial Gaps in Pandemic, Studies Find,
            The New York Times:{' '}
            <u>
              <a
                href="https://www.nytimes.com/2020/12/09/health/coronavirus-black-hispanic.html"
                target="_blank"
              >
                https://www.nytimes.com/2020/12/09/health/coronavirus-black-hispanic.html
              </a>
            </u>
          </li>
          <div>
            <h5> Race & Ethnicity Interactive Bubble Chart: </h5>
            <li>
              - Ethnicity Data, Centers for Disease Control and Prevention (CDC)
              , Provisional Death Counts for Coronavirus Disease (COVID-19):
              Distribution of Deaths by Race and Hispanic Origin:{' '}
              <u>
                <a
                  href="https://data.cdc.gov/NCHS/Provisional-Death-Counts-for-Coronavirus-Disease-C/pj7m-y5uh"
                  target="_blank"
                >
                  https://data.cdc.gov/NCHS/Provisional-Death-Counts-for-Coronavirus-Disease-C/pj7m-y5uh
                </a>
              </u>
            </li>
            <li>
              - Ethnicity Data, United States Census Bureau, State Population by
              Characteristics: 2010-2019: Age, Sex, Race, and Hispanic Origin -
              6 race groups:{' '}
              <u>
                <a
                  href="https://www.census.gov/data/tables/time-series/demo/popest/2010s-state-detail.html"
                  target="_blank"
                >
                  https://www.census.gov/data/tables/time-series/demo/popest/2010s-state-detail.html
                </a>
              </u>
            </li>
          </div>

          <h4>AGE & GENDER</h4>
          <li>
            4. Why COVID-19 is Hitting Men Harder Than Women, Healthline
            <u>
              <a
                href="https://www.healthline.com/health-news/men-more-susceptible-to-serious-covid-19-illnesses"
                target="_blank"
              >
                https://www.healthline.com/health-news/men-more-susceptible-to-serious-covid-19-illnesses
              </a>
            </u>
          </li>
          <li>
            5. What Do We Know About Children and Coronavirus Transmission? KFF:
            <u>
              <a
                href="https://www.kff.org/coronavirus-covid-19/issue-brief/what-do-we-know-about-children-and-coronavirus-transmission/"
                target="_blank"
              >
                https://www.kff.org/coronavirus-covid-19/issue-brief/what-do-we-know-about-children-and-coronavirus-transmission/
              </a>
            </u>
          </li>
          <li>
            6. Why COVID-19 is Hitting Men Harder Than Women, Healthline
            <u>
              <a
                href="https://www.healthline.com/health-news/men-more-susceptible-to-serious-covid-19-illnesses"
                target="_blank"
              >
                https://www.healthline.com/health-news/men-more-susceptible-to-serious-covid-19-illnesses
              </a>
            </u>
          </li>

          <h5> Age & Gender Charts: </h5>
          <li>
            Age & Gender Data, Centers for Disease Control and Prevention (CDC)
            , Provisional COVID-19 Death Counts by Sex, Age, and State:{' '}
            <u>
              <a
                href="https://data.cdc.gov/NCHS/Provisional-COVID-19-Death-Counts-by-Sex-Age-and-S/9bhg-hcku"
                target="_blank"
              >
                https://data.cdc.gov/NCHS/Provisional-COVID-19-Death-Counts-by-Sex-Age-and-S/9bhg-hcku
              </a>
            </u>
          </li>

          <h4>ENVIRONMENT</h4>
          <li>
            7. Near-real-time monitoring of global CO2 emissions reveals the
            effects of the COVID-19 pandemic, Academic Journal:{' '}
            <u>
              <a
                href="https://www.nature.com/articles/s41467-020-18922-7"
                target="_blank"
              >
                https://www.nature.com/articles/s41467-020-18922-7
              </a>
            </u>
          </li>
          <h5>Environment Line Graph:</h5>
          <div>
            <li>
              Carbon dioxide emissions from energy consumption, Data on Monthly
              CO2 in the United States:{' '}
              <u>
                <a
                  href="https://www.eia.gov/totalenergy/data/monthly/?fbclid=IwAR2lMC9dDh2sShSVCFNVxOh39_IdZY54N_hXFRrAWOp4YVahcZ5H_zXTY40"
                  target="_blank"
                >
                  https://www.eia.gov/totalenergy/data/monthly/?fbclid=IwAR2lMC9dDh2sShSVCFNVxOh39_IdZY54N_hXFRrAWOp4YVahcZ5H_zXTY40
                </a>
              </u>
            </li>
          </div>

          <h4>UNEMPLOYMENT</h4>

          <li>
            8. Unemployment rose higher in three months of COVID-19 than it did
            in two years of the Great Recession, Pew Research Center:
            <u>
              <a
                href="https://www.pewresearch.org/fact-tank/2020/06/11/unemployment-rose-higher-in-three-months-of-covid-19-than-it-did-in-two-years-of-the-great-recession/"
                target="_blank"
              >
                https://www.pewresearch.org/fact-tank/2020/06/11/unemployment-rose-higher-in-three-months-of-covid-19-than-it-did-in-two-years-of-the-great-recession/
              </a>
            </u>
          </li>
          <li>
            9. Covid Shrinks the Labor Market, Pushing Out Women and Baby
            Boomers, The Wall Street Journal:
            <u>
              <a
                href="https://www.wsj.com/articles/covid-shrinks-the-labor-market-pushing-out-women-and-baby-boomers-11607022074"
                target="_blank"
              >
                https://www.wsj.com/articles/covid-shrinks-the-labor-market-pushing-out-women-and-baby-boomers-11607022074
              </a>
            </u>
          </li>
          <h5>Unemployment Charts:</h5>
          <li>
            10. Unemployment Data, Bureau of Labor Statistics, Employment status
            of the civilian population by sex and age, Not Seasonally Adjusted:{' '}
            <u>
              <a
                href="https://www.bls.gov/webapps/legacy/cpsatab1.htm"
                target="_blank"
              >
                https://www.bls.gov/webapps/legacy/cpsatab1.htm
              </a>
            </u>
          </li>

          <h4>JAILS & PRISONS</h4>
          <li>
            11. Impact Report: COVID-19 and Prisons, National Commission on
            COVID-19 and Criminal Justice:
            <u>
              <a
                href="https://covid19.counciloncj.org/2020/09/02/covid-19-and-prisons/"
                target="_blank"
              >
                https://covid19.counciloncj.org/2020/09/02/covid-19-and-prisons/
              </a>
            </u>
          </li>
          <h5> U.S. Spike Map: </h5>
          <li>
            Jails & Prisons Data, Covid-19 Jail/Prison Confirmed Cases & Deaths,
            UCLA Law Covid-19 Behind Bars Data Project:{' '}
            <u>
              <a
                href="https://law.ucla.edu/academics/centers/criminal-justice-program/ucla-covid-19-behind-bars-data-project"
                target="_blank"
              >
                https://law.ucla.edu/academics/centers/criminal-justice-program/ucla-covid-19-behind-bars-data-project
              </a>
            </u>
          </li>

          <h4>HUNGER</h4>

          <h5>Hunger Bar Graph:</h5>
          <div>
            <li>
              Experiences with the COVID-19 outbreak can vary for Americans of
              different ages, article:{' '}
              <u>
                <a
                  href="https://www.pewresearch.org/fact-tank/2020/06/16/experiences-with-the-covid-19-outbreak-can-vary-for-americans-of-different-ages/"
                  target="_blank"
                >
                  https://www.pewresearch.org/fact-tank/2020/06/16/experiences-with-the-covid-19-outbreak-can-vary-for-americans-of-different-ages/
                </a>
              </u>
            </li>
            <li>
              What Do We Know About Children and Coronavirus Transmission?,
              Article:{' '}
              <u>
                <a
                  href="https://www.kff.org/coronavirus-covid-19/issue-brief/what-do-we-know-about-children-and-coronavirus-transmission/"
                  target="_blank"
                >
                  https://www.kff.org/coronavirus-covid-19/issue-brief/what-do-we-know-about-children-and-coronavirus-transmission/
                </a>
              </u>
            </li>
            <li>
              Hunger Data, Measuring Household Experiences during the
              Coronavirus Pandemic, The Brookings Institution's analysis of the
              US Census Bureau's household pulse survey:{' '}
              <u>
                <a
                  href="https://www.census.gov/data/experimental-data-products/household-pulse-survey.html"
                  target="_blank"
                >
                  https://www.census.gov/data/experimental-data-products/household-pulse-survey.html
                </a>
              </u>
            </li>
            <li>
              Hunger Data, Food Security in the U.S., United States Department
              of Agriculture Economic Research Service:{' '}
              <u>
                <a
                  href="https://www.ers.usda.gov/topics/food-nutrition-assistance/food-security-in-the-us/"
                  target="_blank"
                >
                  https://www.ers.usda.gov/topics/food-nutrition-assistance/food-security-in-the-us/
                </a>
              </u>
            </li>
          </div>
        </ul>
      </div>
    </div>
  )
}
