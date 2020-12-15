const router = require('express').Router()
const AgeSex = require('../db/models/ageSex')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    console.log('in try')
    const nationData = await AgeSex.findAll({
      where: {
        state: 'United States'
      }
    })
    console.log('after db find')
    console.log(nationData)
    res.json(nationData)
  } catch (error) {
    next(error)
  }
})

router.get('/:stateName', async (req, res, next) => {
  try {
    console.log('in try')
    const stateData = await AgeSex.findAll({
      where: {
        state: req.params.stateName
      }
    })
    console.log('after db find')
    console.log(stateData)
    res.json(stateData)
  } catch (error) {
    next(error)
  }
})
