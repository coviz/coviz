const router = require('express').Router()
const AgeSex = require('../db/models/ageSex')
module.exports = router

// GET routes for gender data
// GET route for age data for all of US
router.get('/', async (req, res, next) => {
  try {
    const nationData = await AgeSex.findAll({
      where: {
        state: 'United States',
        sex: 'All Sexes'
      }
    })
    // send select all ages data
    let nationalData = nationData.slice(1)

    res.json(nationalData)
  } catch (error) {
    next(error)
  }
})

// GET age data for specific state
router.get('/:stateName', async (req, res, next) => {
  try {
    const stateData = await AgeSex.findAll({
      where: {
        state: req.params.stateName
      }
    })
  } catch (error) {
    next(error)
  }
})
