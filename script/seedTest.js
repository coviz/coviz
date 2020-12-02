'use strict'

const db = require('../server/db')
const createStateTable = require('./seedStateModel')
const createCovidDailyTable = require('./seedCovidDailyModel')

async function seed() {
  // build models
  await db.sync({force: true})
  await db
    .close()

    // add data to models
    .then(async () => {
      // currently this isn't seeding all 50 states
      await createStateTable()
    })
  //await createCovidDailyTable()
}

seed()

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
