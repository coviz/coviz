const Sequelize = require('sequelize')
const db = require('../db')

const Unemployment = db.define('unemployment', {
  year: {
    type: Sequelize.STRING
  },
  month: {
    type: Sequelize.STRING
  },
  unemployed: {
    type: Sequelize.INTEGER
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

module.exports = Unemployment
