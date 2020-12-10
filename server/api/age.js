const router = require('express').Router()
const AgeSex = require('../db/models/age-and-sex')
module.exports = router

//routes for gender data
// get age data for all of US
router.get('/', async (req, res, next) => {
  try {
    console.log('in try')
    const nationData = await AgeSex.findAll({
      where: {
        state: 'United States',
        sex: 'All Sexes'
      }
    })
    console.log('after db find')
    // console.log('NATIONAL DATA', nationData)
    let nationalData = nationData.slice(1)
    // ^^ dont want all ages data
    res.json(nationalData)
  } catch (error) {
    next(error)
  }
})

// get age data for specific state
router.get('/:stateName', async (req, res, next) => {
  try {
    const stateData = await AgeSex.findAll({
      where: {
        state: req.params.stateName
      }
    })
    // console.log(stateData)
    // res.json(stateData)
  } catch (error) {
    next(error)
  }
})