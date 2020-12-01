const router = require('express').Router()
const AgeSex = require('../db/models/age-and-sex')
module.exports = router

router.get('/', async (req, res, next) => {
    try {
        console.log('in try')
        const nation = await AgeSex.findAll({
            where: {
                state: 'United States'
            }
            
        })
        console.log('after db find')
        console.log(nation)
        res.json(nation)
    } catch (error) {
        next(error)
    }
})