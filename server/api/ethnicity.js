const { Ethnicity } = require('../db/models')

const router = require('express').Router()
const Ethnicity = require('../db/models/ethnicity')
module.exports = router

router.get('/', async (req, res, next) => {
    try {
        const nation = await Ethnicity.findAll({
            where: {
                state: 'United States'
            }
        })
        res.json(nation)
    } catch (error) {
        next(error)
    }
})


