const Sequelize = require('sequelize')
const db = require('../db')

const State = db.define('state', {
  origin: {
    type: Sequelize.STRING
  },
  capitals: {
    type: Sequelize.STRING
  },
  latitude: {
    type: Sequelize.FLOAT
  },
  longitude: {
    type: Sequelize.FLOAT
  }
})
module.exports = State
