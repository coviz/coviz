const router = require('express').Router()
const Environment = require('../db/models/environment')
module.exports = router

// GET route for all of US co2 data
router.get('/', async (req, res, next) => {
  try {
    const co2Data = await Environment.findAll()

    res.json(co2Data)
  } catch (error) {
    next(error)
  }
})
