const Sequelize = require('sequelize')
const db = require('../db')

const jailsAndPrisons = db.define('jails', {
  facility: {
    type: Sequelize.STRING,
    allowNull: true
  },
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
  residentsRecovered: {
    type: Sequelize.STRING,
    allowNull: true
  },
  staffRecovered: {
    type: Sequelize.STRING,
    allowNull: true
  },
  residentsTested: {
    type: Sequelize.STRING,
    allowNull: true
  },
  staffTested: {
    type: Sequelize.STRING,
    allowNull: true
  },
  residentPopulation: {
    type: Sequelize.STRING,
    allowNull: true
  },
  address: {
    type: Sequelize.STRING,
    allowNull: true
  },
  zipcode: {
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
  FIPS: {
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
