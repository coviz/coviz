const router = require('express').Router()
const Environment = require('../db/models/environment')
module.exports = router

//routes for gender data
// get co2 data for all of US
router.get('/', async (req, res, next) => {
  try {
    console.log('in try')
    const co2Data = await Environment.findAll()
    console.log('after db find')
    // console.log('ENVIRO DATA: ', co2Data)
    res.json(co2Data)
  } catch (error) {
    next(error)
  }
})

// do we want a specific route for each type? no, right?

