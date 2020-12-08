// tests for Age & Sex Sequelize model

const {expect} = require('chai')
const db = require('../index')
const AgeSex = db.model('ageSex')

describe('AgeSex Routes', () => {
    beforeEach(async() => {
        await db.sync({force: true})
        const ageSexRouteTest1 = await Promise.all([
            AgeSex.create({
                state: 'United States',
                sex: 'Female',
                ageGroup: 'All Ages',
                deathTotals: 123,
            })
        ])
        const ageSexRouteTest2 = await Promise.all([
            AgeSex.create({
                state: 'Alabama',
                sex: 'Male',
                ageGroup: 'All Ages',
                deathTotals: 321,
            })
        ])
    })
    describe('GET /api/ageSex/', () => {
        describe('return dataObj where state = "Unites States"', () => {
            it('should return 1 dataObj', async() => {
                // const res =  (make app.get request to route)
                const res = false
                expect(res).to.equal([{
                    state: 'Alabama',
                    sex: 'Male',
                    ageGroup: 'All Ages',
                    deathTotals: 321
                }])
            })
        })
        describe('return dataObj where state != "Unites States"', () => {
            it('should return empty', async() => {
                // const res = await (make app.get request to route)
                const res = false
                expect(res).to.equal([])
            })
        })
    })
})
