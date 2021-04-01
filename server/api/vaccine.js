const router = require('express').Router()
const Sequelize = require('sequelize')
const {Vaccine} = require('../db/models')
module.exports = router

//GET route for all Vaccine data
router.get('/', async (req, res, next) => {
  try {
    const vaccine = await Vaccine.findAll()
    res.json(vaccine)
  } catch (err) {
    next(err)
  }
})
