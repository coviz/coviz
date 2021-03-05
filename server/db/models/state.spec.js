// const {expect} = require('chai')
// const db = require('../index')
// const State = db.model('user')

// describe('State model', () => {
//   beforeEach(() => {
//     return db.sync({force: true})
//   })

//   describe('Basic Fields: name, capital, latitude, longitude, population, statecode', () => {
//     it('has basic fields: state, statecode, longitude, latitude', async () => {
//       const washington = await State.create({
//         state: 'Washington',
//         capital: 'Olympia',
//         latitude: 38.8993487,
//         longitude: 77.0145665,
//         statecode: 'WA'
//       })
//       expect(washington.state).to.equal('Washington')
//       expect(washington.statecode).to.equal('WA')
//       expect(washington.longitude).to.equal(77.0145665)
//       expect(washington.latitude).to.equal(38.8993487)
//     })
//   }) // end describe('Basic Fields: name and email')
// }) // end describe('User model')
