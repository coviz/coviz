const router = require('express').Router()
const AgeSex = require('../db/models/ageSex')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const nationData = await AgeSex.findAll({
      where: {
        state: 'United States'
      }
    })
    res.json(nationData)
  } catch (error) {
    next(error)
  }
})

router.get('/:stateName', async (req, res, next) => {
  try {
    const stateData = await AgeSex.findAll({
      where: {
        state: req.params.stateName
      }
    })

    res.json(stateData)
  } catch (error) {
    next(error)
  }
})
