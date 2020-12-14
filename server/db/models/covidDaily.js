const Sequelize = require('sequelize')
const db = require('../db')

const CovidDaily = db.define('covidDaily', {
  date: {
    type: Sequelize.INTEGER
  },
  statecode: {
    type: Sequelize.STRING
  },
  positiveCumulative: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  positiveIncrease: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  deathCumulative: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  deathIncrease: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  hospitalizedCurrently: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  hospitalizedCumulative: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  hospitalizedIncrease: {
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
