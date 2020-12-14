const Sequelize = require('sequelize')
const db = require('../db')

const Hunger = db.define('hunger', {
  year: {
    type: Sequelize.INTEGER
  },
  overallFoodInsecurity: {
    type: Sequelize.FLOAT
  },
  blackFoodInsecurity: {
    type: Sequelize.FLOAT
  },
  hispanicFoodInsecurity: {
    type: Sequelize.FLOAT
  },
  whiteFoodInsecurity: {
    type: Sequelize.FLOAT
  },
  otherFoodInsecurity: {
    type: Sequelize.FLOAT
  },
  childrenFoodInsecurity: {
    type: Sequelize.FLOAT
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

module.exports = Hunger
