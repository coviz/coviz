# coviz

Welcome to coviz! Coviz is an interactive data visualization of the impact of COVID-19 over time in the United State, including how it intersects with a variety of key issues. We created coviz as our capstone project during the Grace Hopper Program at Fullstack Academy. It highlights how case counts and deaths have changed by state since COVID-19 started, and offers users the opportunity to explore how COVID-19 has impacted demographic groups (age, race and ethnicity, gender, prison populations) and social issues (unemployment, hunger, the environment).

# Technologies

The site uses D3 to render the main map and additional charts, as well as uses React/Redux for the front end. Additionally, the site uses express/sequelize/SQL for the backend and stores data in a PostgreSQL database. The javascript library fast-csv is used to help read our data files so we can store it in PostgreSQL. To ensure everything is working as expected, code is tested using the Chai BDD/TDD assertion library.

For Deployment, this site is supported by heroku, GitHub, and Travis-CI for continuous integration.

Heroku app: https://covizdatavis.herokuapp.com/

GitHub Project Link: https://github.com/coviz/coviz

# Sources

Add source data here.

# To view the project

Please visit coviz at https://covizdatavis.herokuapp.com/

# Instructions to how to download and run project

1.  Fork the "coviz" project repository from GitHub to your personal GitHub account and clone it to your local machine. Please reference the GitHub Project link provided in the "Technologies" section of this README.

2.  `npm install` to download project dependencies.

3.  Running `npm run start-dev` will allow you to view the site on your local machine.

4.  `npm test` to run unit tests.
