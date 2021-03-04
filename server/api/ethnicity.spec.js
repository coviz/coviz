const {expect} = require('chai')
// const request = require('supertest')
const db = require('../db')
const app = require('../index')
const agent = require('supertest')(app)
const ethnicity = db.model('ethnicity')

describe('ethnicity routes', () => {
  beforeEach(async () => {
    await db.sync({force: true})
    await ethnicity.create({
      state: 'California',
      ethn: 'other',
      deaths: 10000,
      pop: 10000000,
      percentage: 0.2
    })
    await ethnicity.create({
      state: 'Alabama',
      ethn: 'African American',
      deaths: 2000,
      pop: 15000000,
      percentage: 0.5
    })
  })

  it('GET /api/ethnicity', async () => {
    const res = await agent.get('/api/ethnicity').expect(200)
    expect(res.body).to.be.an('array')
    expect(res.body[0].state).to.equal('California')
    expect(res.body[1].state).to.equal('Alabama')
    expect(res.body[0].ethn).to.equal('other')
    expect(res.body[1].ethn).to.equal('African American')
  })
  it('GET /api/ethnicity/statesName', async () => {
    const res = await agent.get('/api/ethnicity/Alabama').expect(200)
    expect(res.body).to.be.an('array')
    expect(res.body[0].state).to.equal('Alabama')
    expect(res.body[0].pop).to.equal(15000000)
  })
})
