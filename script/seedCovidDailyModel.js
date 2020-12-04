const fs = require('fs')
const Pool = require('pg').Pool
const fastcsv = require('fast-csv')
const db = require('../server/db')

async function createCovidDailyTable() {
  await db.sync({force: true})
  await db.close()

  let stream = fs.createReadStream('script/daily_covid_case_counts_112320.csv')
  let csvData = []
  let csvStream = fastcsv
    .parse()
    .on('data', function(row) {
      if (row[2] === '') row[2] = 0
      if (row[19] === '') row[19] = 0
      if (row[41] === '') row[41] = 0
      if (row[46] === '') row[46] = 0
      const data = [row[0], row[1], row[2], row[19], row[41], row[46]]
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
        'INSERT INTO "covidDailies" (date, "statecode", positive, death, "positiveIncrease", "deathIncrease") VALUES ($1, $2, $3, $4, $5, $6)'

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
        } catch {
          // what is the difference between done() and end() and close()
          // done()
        }
      })
      // pool.end(() => {
      //   console.log('pool has ended')
      // })
    })

  stream.pipe(csvStream)
}

createCovidDailyTable()

// module.exports = createCovidDailyTable()
