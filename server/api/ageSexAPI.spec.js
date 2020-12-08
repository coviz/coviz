// tests for Age & Sex Sequelize model

const {expect} = require('chai')
const db = require('../db')
const app = require('../index')
const agent = require('supertest')(app)
const AgeSex = db.model('ageSex')

// const {expect} = require('chai')
// const db = require('../index')
// const AgeSex = db.model('ageSex')

describe('AgeSex Routes', () => {
    beforeEach(async() => {
        await db.sync({force: true})
        await AgeSex.create({
            state: 'United States',
            sex: 'Female',
            ageGroup: 'All Ages',
            deathTotals: 123,
        })
        await AgeSex.create({
            state: 'Alabama',
            sex: 'Male',
            ageGroup: 'All Ages',
            deathTotals: 321,
        })
    })
    it('GET /api/ageSex/', async() => {
        // const res =  (make app.get request to route)
        const res = agent.get('/api/ageSex').expect(200)
        expect(res).to.equal([{
            state: 'United States',
            sex: 'Female',
            ageGroup: 'All Ages',
            deathTotals: 123
        }])
    })
    it('GET /api/ageSex/:stateName', async() => {
        // const res = await (make app.get request to route)
        const res = agent.get('/api/ageSex/Alabama')
        console.log(res)
        expect(res.body).to.equal([{
            state: 'Alabama',
            sex: 'Male',
            ageGroup: 'All Ages',
            deathTotals: 321,
        }])
    })
    
})
