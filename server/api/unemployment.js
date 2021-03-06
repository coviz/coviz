const router = require('express').Router()
const {Unemployment} = require('../db/models')
const Sequelize = require('sequelize')
module.exports = router

// GET route for all unemployment data
router.get('/', async (req, res, next) => {
  try {
    const unemployment = await Unemployment.findAll()
    res.json(unemployment)
  } catch (err) {
    next(err)
  }
})

// GET route for unemployment data by gender
router.get('/gender', async (req, res, next) => {
  try {
    const gender = await Unemployment.findAll({
      attributes: [
        'year',
        [Sequelize.fn('max', Sequelize.col('unemployed')), 'total'],
        [Sequelize.fn('max', Sequelize.col('men')), 'Men'],
        [Sequelize.fn('max', Sequelize.col('women')), 'Women']
      ],
      group: ['year']
    })

    res.json(gender)
  } catch (err) {
    next(err)
  }
})
