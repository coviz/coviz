const {BehindBars} = require('../db/models')

const router = require('express').Router()
const Op = require('sequelize').Op

// const Ethnicity = require('../db/models/ethnicity')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const state = await BehindBars.findAll({
      where: {
        latitude: {[Op.ne]: null},
        confirmedResidents: {[Op.ne]: null}
      }
    })
    res.json(state)
  } catch (error) {
    next(error)
  }
})

router.get('/states/:state', async (req, res, next) => {
  try {
    let name = req.params.state
    let firstLetter = name[0].toUpperCase()
    name = `${firstLetter}${name.slice(1)}`
    console.log(name)
    const state = await BehindBars.findAll({
      where: {
        state: name
      }
    })
    res.json(state)
  } catch (error) {
    next(error)
  }
})

router.get('/:date', async (req, res, next) => {
  try {
    let date = req.params.date
    console.log(typeof date, date)
    const allByDate = await BehindBars.findAll({
      where: {
        date: '12/2/2020'
      }
    })
    res.json(allByDate)
  } catch (error) {
    next(error)
  }
})
