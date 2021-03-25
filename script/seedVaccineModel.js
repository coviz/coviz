const fs = require('fs')
const Pool = require('pg').Pool
const fastcsv = require('fast-csv')
const db = require('../server/db')
const connectionString = process.env.HEROKU_POSTGRESQL_PINK_URL
async function createUnemploymentTable() {
  await db.sync()
  await db.close()

  let stream = fs.createReadStream('script/datasets/vaccines_vs_covid.csv')
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
        'INSERT INTO "vaccines" (state, day, vaccinations) VALUES ($1, $2, $3)'

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
