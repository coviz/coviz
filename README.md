# coviz

Welcome to coviz! Coviz is an interactive data visualization of the impact of COVID-19 over time in the United States, including how it intersects with a variety of key issues. We created coviz as our capstone project during the Grace Hopper Program at Fullstack Academy. It highlights how case counts and deaths have changed in each state since COVID-19 began, and offers users the opportunity to explore how COVID-19 has impacted demographic groups (age, race and ethnicity, gender, and prison populations) and social issues (unemployment, hunger, and the environment).

# Technologies

The site uses D3 to render the main map and additional charts, as well as uses React/Redux for the front end. Additionally, the site uses express/sequelize/SQL for the backend and stores data in a PostgreSQL database. The javascript libraries fast-csv and node-postgres (pg) are used to help read our data files and store the read data in PostgreSQL. To ensure everything is working as expected, code is tested using the Chai BDD/TDD assertion library.

For Deployment, this site is supported by heroku, GitHub, and Travis-CI for continuous integration.

Heroku app: https://covizdatavis.herokuapp.com/

GitHub Project Link: https://github.com/coviz/coviz

# Sources

HOMEPAGE

U.S. Bubble Map:
Covid-19 Data, The Covid Tracking Project, The Atlantic: https://covidtracking.com/data

RACE & ETHNICITY

1.  Study: COVID-19 Mortality Twice as High Among Native Americans, U.S. News: https://www.usnews.com/news/health-news/articles/2020-12-10/covid-mortality-twice-as-high-among-native-americans-than-whites
2.  Pacific Islanders in US hospitalised with Covid-19 at up to 10 times the rate of other groups, The Guardian: https://www.theguardian.com/world/2020/jul/27/system-is-so-broken-covid-19-devastates-pacific-islander-communities-in-us
3.  Social Inequities Explain Racial Gaps in Pandemic, Studies Find, The New York Times: https://www.nytimes.com/2020/12/09/health/coronavirus-black-hispanic.html

Race & Ethnicity Interactive Bubble Chart:

* Ethnicity Data, Centers for Disease Control and Prevention (CDC), Provisional Death Counts for Coronavirus Disease (COVID-19):
  Distribution of Deaths by Race and Hispanic Origin: https://data.cdc.gov/NCHS/Provisional-Death-Counts-for-Coronavirus-Disease-C/pj7m-y5uh
* Ethnicity Data, United States Census Bureau, State Population by Characteristics: 2010-2019: Age, Sex, Race, and Hispanic Origin - 6 race groups: https://www.census.gov/data/tables/time-series/demo/popest/2010s-state-detail.html

AGE & GENDER

4.  Why COVID-19 is Hitting Men Harder Than Women, Healthline: https://www.healthline.com/health-news/men-more-susceptible-to-serious-covid-19-illnesses
5.  What Do We Know About Children and Coronavirus Transmission? KFF: https://www.kff.org/coronavirus-covid-19/issue-brief/what-do-we-know-about-children-and-coronavirus-transmission/
6.  Why COVID-19 is Hitting Men Harder Than Women, Healthline: https://www.healthline.com/health-news/men-more-susceptible-to-serious-covid-19-illnesses

Age & Gender Charts:

Age & Gender Data, Centers for Disease Control and Prevention (CDC), Provisional COVID-19 Death Counts by Sex, Age, and State: https://data.cdc.gov/NCHS/Provisional-COVID-19-Death-Counts-by-Sex-Age-and-S/9bhg-hcku

ENVIRONMENT

7.  Near-real-time monitoring of global CO2 emissions reveals the effects of the COVID-19 pandemic, Academic Journal: https://www.nature.com/articles/s41467-020-18922-7

Environment Line Graph:

Carbon dioxide emissions from energy consumption, Data on Monthly CO2 in the United States: https://www.eia.gov/totalenergy/data/monthly/?fbclid=IwAR2lMC9dDh2sShSVCFNVxOh39_IdZY54N_hXFRrAWOp4YVahcZ5H_zXTY40

UNEMPLOYMENT

8.  Unemployment rose higher in three months of COVID-19 than it did in two years of the Great Recession, Pew Research Center: https://www.pewresearch.org/fact-tank/2020/06/11/unemployment-rose-higher-in-three-months-of-covid-19-than-it-did-in-two-years-of-the-great-recession/
9.  Covid Shrinks the Labor Market, Pushing Out Women and Baby Boomers, The Wall Street Journal: https://www.wsj.com/articles/covid-shrinks-the-labor-market-pushing-out-women-and-baby-boomers-11607022074

Unemployment Charts:

10. Unemployment Data, Bureau of Labor Statistics, Employment status of the civilian population by sex and age, Not Seasonally Adjusted: https://www.bls.gov/webapps/legacy/cpsatab1.htm

JAILS & PRISONS

11. Impact Report: COVID-19 and Prisons, National Commission on COVID-19 and Criminal Justice: https://covid19.counciloncj.org/2020/09/02/covid-19-and-prisons/

U.S. Spike Map:

Jails & Prisons Data, Covid-19 Jail/Prison Confirmed Cases & Deaths, UCLA Law Covid-19 Behind Bars Data Project: https://law.ucla.edu/academics/centers/criminal-justice-program/ucla-covid-19-behind-bars-data-project

HUNGER

Hunger Bar Graph:

Experiences with the COVID-19 outbreak can vary for Americans of different ages, article: https://www.pewresearch.org/fact-tank/2020/06/16/experiences-with-the-covid-19-outbreak-can-vary-for-americans-of-different-ages/

What Do We Know About Children and Coronavirus Transmission?, Article: https://www.kff.org/coronavirus-covid-19/issue-brief/what-do-we-know-about-children-and-coronavirus-transmission/

Hunger Data, Measuring Household Experiences during the Coronavirus Pandemic, The Brookings Institution's analysis of the US Census Bureau's household pulse survey: https://www.census.gov/data/experimental-data-products/household-pulse-survey.html

Hunger Data, Food Security in the U.S., United States Department of Agriculture Economic Research Service: https://www.ers.usda.gov/topics/food-nutrition-assistance/food-security-in-the-us/

# To view the project

Please visit coviz at https://covizdatavis.herokuapp.com/

# Instructions to how to download and run project

1.  Fork the "coviz" project repository from GitHub to your personal GitHub account and clone it to your local machine. Please reference the GitHub Project link provided in the "Technologies" section of this README.

2.  `npm install` to download project dependencies.

3.  Create a database named `coviz` and run `npm seed` to seed it.

4.  Running `npm run start-dev` will allow you to view the site on your local machine.

5.  `npm test` to run unit tests. Additionally, you will need to create a database named `coviz-test` that the unit tests will use.
