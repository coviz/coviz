const State = require('./state')
const Ethnicity = require('./ethnicity')
const AgeSex = require('./age-and-sex')
const CovidDaily = require('./covidDaily')
const BehindBars = require('./behind-bars')
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

// State.hasMany(CovidDaily)
// CovidDaily.belongsTo(State)

module.exports = {
  State,
  Ethnicity,
  AgeSex,
  CovidDaily,
  BehindBars
}
