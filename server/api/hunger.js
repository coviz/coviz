const router = require('express').Router()
const {Hunger} = require('../db/models')
module.exports = router

// GET route for all hunger data
router.get('/', async (req, res, next) => {
  try {
    const hungerData = await Hunger.findAll()
    res.json(hungerData)
  } catch (err) {
    next(err)
  }
})
