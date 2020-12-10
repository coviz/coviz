const Sequelize = require('sequelize')
const db = require('../db')

const Enviro = db.define('enviro', {
  code: {
    type: Sequelize.STRING
  },
  date: {
    type: Sequelize.INTEGER
  },
  value: {
    type: Sequelize.DECIMAL(10, 3)
  },
  description: {
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

module.exports = Enviro;
