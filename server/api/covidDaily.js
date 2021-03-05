const router = require('express').Router()
const db = require('../db')
module.exports = router

// GET route for all COVID data
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

//GET route for COVID data for one state
router.get('/:statecode', async (req, res, next) => {
  const query = `SELECT states.state, states.statecode, states.latitude, states.longitude, states.population, date FROM states JOIN "covidDailies" ON states.statecode = "covidDailies".statecode WHERE states.statecode='${
    req.params.statecode
  }'`
  try {
    const [results] = await db.query(query)
    res.json(results)
  } catch (err) {
    next(err)
  }
})

//GET route for COVID data for one date
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
