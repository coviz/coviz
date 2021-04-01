const router = require('express').Router()
module.exports = router

router.use('/unemployment', require('./unemployment'))
router.use('/ethnicity', require('./ethnicity'))
router.use('/age', require('./age'))
router.use('/environment', require('./environment'))
router.use('/gender', require('./gender'))
router.use('/covidDaily', require('./covidDaily'))
router.use('/behindBars', require('./behindBars'))
router.use('/hunger', require('./hunger'))
router.use('/vaccine', require('./vaccine'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
