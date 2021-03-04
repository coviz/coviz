const {expect} = require('chai')
const db = require('../index')
const ethnicity = db.model('ethnicity')

describe('Ethnicity model', () => {
  beforeEach(async () => {
    await db.sync({force: true})
  })
  afterEach(() => db.sync({force: true}))

  it('has fields state, ethnicity, deaths, pop, and percentage', async () => {
    const example = await ethnicity.create({
      state: 'California',
      ethn: 'American Indian or Alaska Native',
      pop: 10000000,
      deaths: 10000,
      percentage: 0.2
    })
    expect(example.deaths).to.equal(10000)
    expect(example.state).to.equal('California')
    expect(example.ethn).to.equal('American Indian or Alaska Native')
    expect(example.pop).to.equal(10000000)
    expect(example.percentage).to.equal('0.20')
  })
  it('state and ethnicity cannot be empty', async () => {
    try {
      const example = await ethnicity.create({state: '', ethn: ''})
      throw Error(
        'validation should fail with empty string for state and ethnicity.'
      )
    } catch (error) {
      console.error(error.message)
      expect(error.message).to.contain(
        'validation should fail with empty string for state and ethnicity.'
      )
    }
  })
})
