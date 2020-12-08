const router = require('express').Router()
const AgeSex = require('../db/models/age-and-sex')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const nation = await AgeSex.findAll({
      where: {
        state: 'United States'
      }
    })
    res.json(nation)
  } catch (error) {
    next(error)
  }
})

router.get('/:stateName', async (req, res, next) => {
  try {
    const state = await AgeSex.findAll({
      where: {
        state: req.params.stateName
      }
    })
    res.json(state)
  } catch (error) {
    next(error)
  }
})
