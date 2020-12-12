const router = require('express').Router()
module.exports = router

// router.use('/states', require('./states')
router.use('/unemployment', require('./unemployment'))
router.use('/ethnicity', require('./ethnicity'))
router.use('/age', require('./age'))
router.use('/gender', require('./gender'))
router.use('/covidDaily', require('./covidDaily'))
router.use('/hunger', require('./hunger'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
