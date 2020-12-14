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
