const Sequelize = require('sequelize')
const db = require('../db')

const Ethnicity = db.define('ethnicity', {
    state: {
        type: Sequelize.STRING,
    },
    caucasianTotals: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    africanAmericanTotals: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    nativeAmericanTotals: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    asianAmericanTotals: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    pacificIslanderTotals: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    latinoAmericanTotals: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    otherTotals: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
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
