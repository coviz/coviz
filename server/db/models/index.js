const State = require('./state')
const Ethnicity = require('./ethnicity')
const Environment = require('./environment')
const AgeSex = require('./age-and-sex')
const CovidDaily = require('./covidDaily')
const Unemployment = require('./unemployment')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

// State.hasMany(CovidDaily)
// CovidDaily.belongsTo(State)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  State,
  Ethnicity,
  Environment,
  AgeSex,
  CovidDaily,
  Unemployment
}
