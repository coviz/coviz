const {Ethnicity} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const router = require('express').Router()
module.exports = router

// GET route for all race and ethnicity data
router.get('/', async (req, res, next) => {
  try {
    const nation = await Ethnicity.findAll({
      where: {
        state: {[Op.notIn]: ['United States']}
      }
    })
    res.json(nation)
  } catch (error) {
    next(error)
  }
})

// GET route for one state's race and ethnicity data
router.get('/:stateName', async (req, res, next) => {
  try {
    const state = await Ethnicity.findAll({
      where: {
        state: req.params.stateName
      }
    })
    res.json(state)
  } catch (error) {
    next(error)
  }
})
