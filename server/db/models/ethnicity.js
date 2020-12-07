const Sequelize = require('sequelize')
const db = require('../db')

const Ethnicity = db.define('ethnicity', {
    ethnicity: {
        type: Sequelize.STRING,
    },
    raw: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    perPop: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    deathPerPop: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0,
    },
    state: {
        type: Sequelize.STRING,
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
