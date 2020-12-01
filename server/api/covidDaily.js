const router = require('express').Router()
const {CovidDaily} = require('../db/models')
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

// GET route for a specific data's data
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

// GET route for a specific state's data
router.get('/state/:stateCode', async (req, res, next) => {
  try {
    const covidDailyStateData = await CovidDaily.findAll({
      where: {
        stateCode: req.params.stateCode
      }
    })
    res.json(covidDailyStateData)
  } catch (err) {
    next(err)
  }
})
