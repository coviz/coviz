const Sequelize = require('sequelize')
const db = require('../db')

const Ethnicity = db.define('ethnicity', {
  state: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ethnicity: {
    type: Sequelize.STRING,
    allowNull: false
  },
  deaths: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  pop: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  percentage: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0
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

module.exports = Ethnicity
