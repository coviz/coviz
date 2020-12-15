const router = require('express').Router()
const Environment = require('../db/models/environment')
module.exports = router

// GET route for all of US co2 data
router.get('/', async (req, res, next) => {
  try {
    console.log('in try')
    const co2Data = await Environment.findAll()
    console.log('after db find')
    res.json(co2Data)
  } catch (error) {
    next(error)
  }
})
