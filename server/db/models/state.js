const Sequelize = require('sequelize')
const db = require('../db')

const State = db.define('state', {
  state: {
    type: Sequelize.STRING
  },
  capital: {
    type: Sequelize.STRING
  },
  latitude: {
    type: Sequelize.FLOAT
  },
  longitude: {
    type: Sequelize.FLOAT
  },
  population: {
    type: Sequelize.BIGINT
  },
  statecode: {
    type: Sequelize.STRING
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: true
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: true
  }
})
module.exports = State
