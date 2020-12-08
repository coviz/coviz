const {expect} = require('chai')
// const request = require('supertest')
const db = require('../db')
const app = require('../index')
const agent = require('supertest')(app)
const covidDaily = db.model('covidDaily')
const state = db.model('state')

describe('covidDaily routes', () => {
  beforeEach(async () => {
    await db.sync({force: true})
    await covidDaily.create({
      date: 20201123,
      statecode: 'CA',
      positive: 100,
      death: 10,
      positiveIncrease: 10,
      deathIncrease: 2
    })
    await state.create({
      state: 'California',
      capital: 'Sacramento',
      latitude: 2,
      longitude: 2,
      population: 100,
      statecode: 'CA'
    })
  })
  // afterEach(() => db.sync({force: true}))

  it('GET /api/covidDaily', async () => {
    const res = await agent.get('/api/covidDaily').expect(200)
    expect(res.body).to.be.an('array')
    expect(res.body[0].state).to.equal('California')
    expect(res.body[0].date).to.equal(20201123)
  })
  it('GET /api/covidDaily/states', async () => {
    const res = await agent.get('/api/covidDaily/states/CA').expect(200)
    expect(res.body).to.be.an('array')
    expect(res.body[0].state).to.equal('California')
    expect(res.body[0].date).to.equal(20201123)
  })
})
