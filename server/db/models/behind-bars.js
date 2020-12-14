const Sequelize = require('sequelize')
const db = require('../db')

const jailsAndPrisons = db.define('jails', {
  state: {
    type: Sequelize.STRING,
    allowNull: true
  },
  nameOfFacility: {
    type: Sequelize.STRING,
    allowNull: true
  },
  date: {
    type: Sequelize.STRING,
    allowNull: true
  },
  confirmedResidents: {
    type: Sequelize.STRING,
    allowNull: true
  },
  confirmedStaff: {
    type: Sequelize.STRING,
    allowNull: true
  },
  deathsResidents: {
    type: Sequelize.STRING,
    allowNull: true
  },
  deathsStaff: {
    type: Sequelize.STRING,
    allowNull: true
  },
  city: {
    type: Sequelize.STRING,
    allowNull: true
  },
  county: {
    type: Sequelize.STRING,
    allowNull: true
  },
  latitude: {
    type: Sequelize.STRING,
    allowNull: true
  },
  longitude: {
    type: Sequelize.STRING,
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

module.exports = jailsAndPrisons
