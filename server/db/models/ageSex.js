const Sequelize = require('sequelize')
const db = require('../db')

const AgeSex = db.define('ageSex', {
  state: {
    type: Sequelize.STRING
  },
  sex: {
    type: Sequelize.STRING
  },
  ageGroup: {
    type: Sequelize.STRING
  },
  deathTotals: {
    type: Sequelize.INTEGER
  },
  pop: {
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

module.exports = AgeSex
