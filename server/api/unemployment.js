const router = require('express').Router()
const {Unemployment} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const unemployment = await Unemployment.findAll()
    res.json(unemployment)
  } catch (err) {
    next(err)
  }
})
