const {expect} = require('chai')
const db = require('../index')
const covidDaily = db.model('covidDaily')

describe('covidDaily model', () => {
  beforeEach(async () => {
    await db.sync({force: true})
  })
  afterEach(() => db.sync({force: true}))

  it('has fields date, stateCode, positive, death, positiveIncrease, and deathIncrease', async () => {
    const example = await covidDaily.create({
      date: 20201123,
      statecode: 'CA',
      positive: 100,
      death: 10,
      positiveIncrease: 10,
      deathIncrease: 2
    })
    expect(example.date).to.equal(20201123)
    expect(example.statecode).to.equal('CA')
    expect(example.positive).to.equal(100)
    expect(example.death).to.equal(10)
    expect(example.positiveIncrease).to.equal(10)
    expect(example.deathIncrease).to.equal(2)
  })
  it('date and statecode cannot be empty', async () => {
    try {
      const example = await covidDaily.create({date: '', statecode: 'CA'})
      throw Error('validation should fail with empty string for date.')
    } catch (error) {
      console.log(error.message)
      expect(error.message).to.contain('invalid input syntax for type integer')
    }
  })
})
