const fs = require('fs')
const Pool = require('pg').Pool
const fastcsv = require('fast-csv')
const db = require('../server/db')

async function createCovidDailyTable() {
  await db.sync()
  await db.close()

  let stream = fs.createReadStream('script/datasets/all-states-history.csv')
  let csvData = []
  let csvStream = fastcsv
    .parse()
    .on('data', function(row) {
      if (row[20] === '') row[20] = '0'
      if (row[3] === '') row[3] = '0'
      if (row[22] === '') row[22] = '0'
      if (row[5] === '') row[5] = '0'
      if (row[9] === '') row[9] = '0'
      if (row[7] === '') row[7] = '0'
      if (row[10] === '') row[10] = '0'
      const data = [
        row[0],
        row[1],
        row[20],
        row[3],
        row[22],
        row[5],
        row[9],
        row[7],
        row[10]
      ]
      csvData.push(data)
    })
    .on('end', function() {
      // remove the first line: header
      csvData.shift()

      // create a new connection to the database
      const pool = new Pool({
        host: 'localhost',
        user: 'postgres',
        // ^^comment this back in when not on Anna's comp^^
        // user: 'ania',
        // password: 'newPassword',
        // ^^comment these 2 lines out when not on Anna's comp^^
        database: 'coviz',
        port: 5432
      })

      const query =
        'INSERT INTO "covidDailies" (date, "statecode", "positiveCumulative", "deathCumulative", "positiveIncrease", "deathIncrease", "hospitalizedCurrently", "hospitalizedCumulative", "hospitalizedIncrease") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)'

      pool.connect((err, client, done) => {
        if (err) throw err

        try {
          csvData.forEach(row => {
            client.query(query, row, (err, res) => {
              if (err) {
                console.log(err.stack)
              } else {
                console.log('inserted ' + res.rowCount + ' row:', row)
              }
            })
          })
        } finally {
          //done()
        }
      })
    })

  stream.pipe(csvStream)
}

createCovidDailyTable()

module.exports = createCovidDailyTable
