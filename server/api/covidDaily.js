const router = require('express').Router()
const {CovidDaily, State} = require('../db/models')
const db = require('../db')
module.exports = router

// query for all data

router.get('/', async (req, res, next) => {
  const query =
    'SELECT states.state, states.statecode, states.latitude, states.longitude, states.population, date, "positiveCumulative", "positiveIncrease", "deathCumulative", "deathIncrease", "hospitalizedCurrently", "hospitalizedCumulative", "hospitalizedIncrease" FROM states JOIN "covidDailies" ON states.statecode = "covidDailies".statecode'
  try {
    const [results] = await db.query(query)
    res.json(results)
  } catch (err) {
    next(err)
  }
})

//GET route by state
router.get('/states/:statecode', async (req, res, next) => {
  const query = `SELECT states.state, states.statecode, states.latitude, states.longitude, states.population, date, positive FROM states JOIN "covidDailies" ON states.statecode = "covidDailies".statecode WHERE states.statecode='${
    req.params.statecode
  }'`
  try {
    const [results] = await db.query(query)

    res.json(results)
  } catch (err) {
    next(err)
  }
})

//GET route by date
router.get('/:date', async (req, res, next) => {
  const query = `SELECT states.state, states.statecode, states.latitude, states.longitude, states.population, date, positive FROM states JOIN "covidDailies" ON states.statecode = "covidDailies".statecode WHERE date=${
    req.params.date
  }`

  try {
    const [results] = await db.query(query)
    res.json(results)
  } catch (err) {
    next(err)
  }
})
