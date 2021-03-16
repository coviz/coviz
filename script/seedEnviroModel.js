const fs = require('fs')
const Pool = require('pg').Pool
const fastcsv = require('fast-csv')
const db = require('../server/db')
const connectionString = process.env.HEROKU_POSTGRESQL_PINK_URL

async function createTable() {
  await db.sync()
  await db.close()
  console.log('this is inside createTable')
  let stream = fs.createReadStream('script/datasets/totalCO2Emissions.csv')
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
            connectionString: connectionString,
            ssl: {
              rejectUnauthorized: false
            }
          })
        : new Pool({
            host: 'localhost',
            user: 'postgres',
            database: 'coviz',
            port: 5432
          })

      const query =
        'INSERT INTO environments (code, date, value, description) VALUES ($1, $2, $3, $4)'

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
