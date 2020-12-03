const Sequelize = require('sequelize')
const db = require('../db')

const CovidDaily = db.define('covidDaily', {
  date: {
    type: Sequelize.STRING
  },
  statecode: {
    type: Sequelize.STRING
  },
  positive: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  death: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  positiveIncrease: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  deathIncrease: {
    type: Sequelize.INTEGER,
    allowNull: true
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

module.exports = CovidDaily
