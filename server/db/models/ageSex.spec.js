// tests for Age & Sex Sequelize model

const {expect} = require('chai')
const db = require('../index')
const AgeSex = db.model('ageSex')

describe('AgeSex model', () => {
    beforeEach(() => {
        return db.sync({force: true})
    })
    describe('state, sex, ageGroup', () => {
        it('state, sex, & ageGroup must be type string', async() => {
            const ageSexTest1 = await AgeSex.create({
                state: 'test',
                sex: 'test',
                ageGroup: 'test',
                deathTotals: 123,
            })
            expect(typeof ageSexTest1.state).to.equal('string')
            expect(typeof ageSexTest1.sex).to.equal('string')
            expect(typeof ageSexTest1.ageGroup).to.equal('string')
        })
    })
    describe('deathTotals', () => {
        it('deathTotals must be type integer', async() => {
            const ageSexTest2 = await AgeSex.create({
                state: 'test',
                sex: 'test',
                ageGroup: 'test',
                deathTotals: 123,
            })
            expect(typeof ageSexTest2.deathTotals).to.equal('number')
        })
    })

})
