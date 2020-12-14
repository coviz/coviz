// tests for Age & Sex Sequelize model

const {expect} = require('chai')
const db = require('../db')
const app = require('../index')
const agent = require('supertest')(app)
const AgeSex = db.model('ageSex')


describe('AgeSex Routes', () => {
    beforeEach(async() => {
        await db.sync({force: true})
        await AgeSex.create({
            state: 'United States',
            sex: 'Female',
            ageGroup: 'All Ages',
            deathTotals: 123,
        })
    })
    it('GET /api/ageSex/', async() => {
        const res = await agent.get('/api/ageSex').expect(200)
        expect(res.body).to.be.an('array')
        expect(res.body[0].ageGroup).to.equal('All Ages')
        expect(res.body[0].deathTotals).to.equal(123)
    })
})
