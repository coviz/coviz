const Sequelize = require('sequelize')
const db = require('../db')

const Ethnicity = db.define('ethnicity', {
  state: {
    type: Sequelize.STRING
  },
  caucasianTotals: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  caucasianPercentage: {
    type: Sequelize.DECIMAL(10, 1),
    defaultValue: 0
  },
  africanAmericanTotals: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  africanAmericanPercentage: {
    type: Sequelize.DECIMAL(10, 1),
    defaultValue: 0
  },
  nativeAmericanTotals: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  nativeAmericanPercentage: {
    type: Sequelize.DECIMAL(10, 1),
    defaultValue: 0
  },
  asianAmericanTotals: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  asianAmericanPercentage: {
    type: Sequelize.DECIMAL(10, 1),
    defaultValue: 0
  },
  pacificIslanderTotals: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  pacificIslanderPercentage: {
    type: Sequelize.DECIMAL(10, 1),
    defaultValue: 0
  },
  latinoAmericanTotals: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  latinoAmericanPercentage: {
    type: Sequelize.DECIMAL(10, 1),
    defaultValue: 0
  },
  otherTotals: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  otherPercentage: {
    type: Sequelize.DECIMAL(10, 1),
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
