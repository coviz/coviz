const Sequelize = require('sequelize')
const db = require('../db')

const Vaccine = db.define('vaccine', {
  state: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  vaccinations: {
    type: Sequelize.INTEGER,
    allowNull: false
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

module.exports = Vaccine
