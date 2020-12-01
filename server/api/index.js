const router = require('express').Router()
module.exports = router

// router.use('/states', require('./states')
router.use('/ethnicity', require('./ethnicity'))
router.use('/age-and-sex', require('./ageSex'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
