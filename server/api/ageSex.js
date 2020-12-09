const router = require('express').Router()
const AgeSex = require('../db/models/age-and-sex')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const nation = await AgeSex.findAll({
      where: {
        state: 'United States'
      }
    })
    res.json(nation)
  } catch (error) {
    next(error)
  }
})
// router.get('/gender', async (req, res, next) => {
//     try {
//         const gender = await AgeSex.findAll({
//             attributes: ['sex', 'state',
//      [Sequelize.fn('sum', Sequelize.col('deathTotals')),'total']],
//             where: {
//                 state: {[Op.notIn]: ['United States']},
//                 sex: {[Op.notIn]: ['All Sexes', 'Unknown']},
//                 ageGroup: 'All Ages'

//             },
//             group:['sex', 'state']
//         })
//         res.json(gender)
//     } catch (error) {
//         next(error)
//     }
// })
router.get('/gender', async (req, res, next) => {
  try {
    const gender = await AgeSex.findAll({
      attributes: [
        'sex',
        'state',
        [Sequelize.fn('sum', Sequelize.col('deathTotals')), 'total']
      ],
      where: {
        state: {[Op.notIn]: ['United States']},
        sex: {[Op.notIn]: ['All Sexes', 'Unknown']},
        ageGroup: {[Op.notIn]: ['All Ages']}
      },
      group: ['sex', 'state']
    })

    let data = {}
    for (let i = 0; i < gender.length; i++) {
      let curr = gender[i].dataValues

      if (!data.hasOwnProperty(curr.state)) {
        data[curr.state] = {femaleCount: 0, maleCount: 0}
      }
      if (curr.sex === 'Female') {
        data[curr.state].femaleCount = curr.total
      } else {
        data[curr.state].maleCount = curr.total
      }
    }
    let arr = []
    for (let key in data) {
      arr.push({
        state: key,
        females: data[key].femaleCount,
        males: data[key].maleCount
      })
    }
    let columns = arr.map(elem => {
      return elem.state
    })
    arr.push(columns)
    res.json(arr)
  } catch (error) {
    next(error)
  }
})

router.get('/:stateName', async (req, res, next) => {
  try {
    const state = await AgeSex.findAll({
      where: {
        state: req.params.stateName
      }
    })
    res.json(state)
  } catch (error) {
    next(error)
  }
})
