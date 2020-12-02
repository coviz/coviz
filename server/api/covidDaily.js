const router = require('express').Router()
const {CovidDaily, State} = require('../db/models')
const db = require('../db')
module.exports = router

// GET route for all data
// Do we actually need this call? It takes a long time to load....
router.get('/', async (req, res, next) => {
  try {
    const covidDailyData = await CovidDaily.findAll()
    res.json(covidDailyData)
  } catch (err) {
    next(err)
  }
})

// GET route for a specific date's data from CovidDaily model
router.get('/:date', async (req, res, next) => {
  try {
    const covidDailyDateData = await CovidDaily.findAll({
      where: {
        date: +req.params.date
      }
    })
    res.json(covidDailyDateData)
  } catch (err) {
    next(err)
  }
})

// GET route for a specific date joining state an covidDaily data.
// Using Sequelize?
router.get('/:date', async (req, res, next) => {
  try {
    const covidDailyDateData = await State.findAll({
      include: {
        model: CovidDaily,
        Where: {
          stateCode: req.params.date
        }
      }
    })
    res.json(covidDailyDateData)
  } catch (err) {
    next(err)
  }
})

// Using SQL?
// query for all data
const query =
  'SELECT states.state, states.statecode, states.latitude, states.longitude, states.population, date, positive FROM states JOIN "covidDailies" ON states.statecode = "covidDailies".statecode'

router.get('/', async (req, res, next) => {
  try {
    const data = db.query(query)
    res.json(data)
  } catch (err) {
    next(err)
  }
})

// GET route for a specific state's data
router.get('/state/:stateCode', async (req, res, next) => {
  try {
    const covidDailyStateData = await CovidDaily.findAll({
      where: {
        statecode: req.params.stateCode
      }
    })
    res.json(covidDailyStateData)
  } catch (err) {
    next(err)
  }
})

// SQL query by state
//`SELECT states.state, states.statecode, states.latitude, states.longitude, states.population, date, positive FROM states JOIN "covidDailies" ON states.statecode = "covidDailies".statecode WHERE states.statecode=${stateCode}`

// SQL query by date
//`SELECT states.state, states.statecode, states.latitude, states.longitude, states.population, date, positive FROM states JOIN "covidDailies" ON states.statecode = "covidDailies".statecode WHERE date=${date}`
