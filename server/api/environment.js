const router = require('express').Router()
const Environment = require('../db/models/environment')
module.exports = router

//routes for gender data
// get age data for all of US
router.get('/', async (req, res, next) => {
  try {
    console.log('in try')
    const co2Emissions = await Environment.findAll()
    console.log('after db find')
    console.log('ENVIRO DATA: ', co2Emissions)
    res.json(co2Emissions)
  } catch (error) {
    next(error)
  }
})

// do we want a specific route for each type? no, right?

