// tests for Age & Sex Sequelize model

const {expect} = require('chai')
const db = require('../db')
const app = require('../index')
const agent = require('supertest')(app)
const AgeSex = db.model('ageSex')

describe('AgeSex Routes', () => {
  beforeEach(async () => {
    await db.sync({force: true})
    await AgeSex.create({
      state: 'United States',
      sex: 'All Sexes',
      ageGroup: 'All Ages',
      deathTotals: 123,
      pop: 74444287
    })
    await AgeSex.create({
      state: 'United States',
      sex: 'All Sexes',
      ageGroup: '0-17 years',
      deathTotals: 123,
      pop: 74444287
    })
  })
  it('GET /api/age', async () => {
    const res = await agent.get('/api/age').expect(200)
    expect(res.body).to.be.an('array')
    expect(res.body[0].ageGroup).to.equal('0-17 years')
    expect(res.body[0].deathTotals).to.equal(123)
  })
})
