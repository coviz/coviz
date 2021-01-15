const router = require('express').Router()
const AgeSex = require('../db/models/ageSex')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = router

const states = {
  Alabama: 'AL',
  Alaska: 'AK',
  Arizona: 'AZ',
  Arkansas: 'AR',
  California: 'CA',
  Colorado: 'CO',
  Connecticut: 'CT',
  Delaware: 'DE',
  'District Of Columbia': 'DC',
  Florida: 'FL',
  Georgia: 'GA',
  Hawaii: 'HI',
  Idaho: 'ID',
  Illinois: 'IL',
  Indiana: 'IN',
  Iowa: 'IA',
  Kansas: 'KS',
  Kentucky: 'KY',
  Louisiana: 'LA',
  Maine: 'ME',
  Maryland: 'MD',
  Massachusetts: 'MA',
  Michigan: 'MI',
  Minnesota: 'MN',
  Mississippi: 'MS',
  Missouri: 'MO',
  Montana: 'MT',
  Nebraska: 'NE',
  Nevada: 'NV',
  'New Hampshire': 'NH',
  'New Jersey': 'NJ',
  'New Mexico': 'NM',
  'New York': 'NY',
  'North Carolina': 'NC',
  'North Dakota': 'ND',
  Ohio: 'OH',
  Oklahoma: 'OK',
  Oregon: 'OR',
  Pennsylvania: 'PA',
  'Rhode Island': 'RI',
  'South Carolina': 'SC',
  'South Dakota': 'SD',
  Tennessee: 'TN',
  Texas: 'TX',
  Utah: 'UT',
  Vermont: 'VT',
  Virginia: 'VA',
  Washington: 'WA',
  'West Virginia': 'WV',
  Wisconsin: 'WI',
  Wyoming: 'WY'
}

// GET route for death counts by gender in US
router.get('/', async (req, res, next) => {
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

    const data2 = arr.map(elem => {
      if (elem.state) {
        elem.state = states[elem.state]
        elem.total = +elem.females + +elem.males
        elem.women = +elem.females
        elem.men = +elem.males
      }
      return elem
    })

    res.json(data2)
  } catch (error) {
    next(error)
  }
})
