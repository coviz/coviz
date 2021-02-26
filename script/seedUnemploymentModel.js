const fs = require('fs')
const Pool = require('pg').Pool
const fastcsv = require('fast-csv')
const db = require('../server/db')
const connectionString = process.env.HEROKU_POSTGRESQL_PINK_URL
async function createUnemploymentTable() {
  await db.sync()
  await db.close()

  let stream = fs.createReadStream(
    'script/datasets/total_unemployment_rates.csv'
  )
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
      const pool = process.env.HEROKU_POSTGRESQL_PINK_URL
        ? new Pool({
            connectionString: connectionString
          })
        : new Pool({
            host: 'localhost',
            user: 'postgres',
            database: 'coviz',
            port: 5432
          })

      const query =
        'INSERT INTO "unemployment" (year, month, "unemployed", men, women, "notInLaborMen","notInLaborWomen") VALUES ($1, $2, $3, $4, $5, $6, $7)'

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

createUnemploymentTable()
