const fs = require('fs')
const Pool = require('pg').Pool
const fastcsv = require('fast-csv')
const db = require('../server/db')

async function createTable() {
  await db.sync({force: true})
  await db.close()
  console.log('this is inside createTable')
  let stream = fs.createReadStream('script/covid_deaths_race.csv')
  let csvData = []
  let csvStream = fastcsv
    .parse()
    .on('data', function(data) {
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
      console.log('this is right before query')
      const query =
        'INSERT INTO "ethnicities" (state, "caucasianTotals", "caucasianPercentage", "africanAmericanTotals", "africanAmericanPercentage", "nativeAmericanTotals", "nativeAmericanPercentage", "asianAmericanTotals", "asianAmericanPercentage", "pacificIslanderTotals", "pacificIslanderPercentage", "latinoAmericanTotals", "latinoAmericanPercentage", "otherTotals", "otherPercentage") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)'

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
          done()
        }
      })
    })

  stream.pipe(csvStream)
}

createTable()
