const fs = require('fs')
const Pool = require('pg').Pool
const fastcsv = require('fast-csv')
const db = require('../server/db')

async function createTable() {
  await db.sync()
  await db.close()
  let stream = fs.createReadStream('script/prison-data.csv')
  let csvData = []
  let csvStream = fastcsv
    .parse()
    .on('data', function(row) {
      let data = []
      for (let i = 0; i < 11; i++) {
        if (row[i] === '') row[i] = null
        data.push(row[i])
      }
      csvData.push(data)
    })
    .on('end', function() {
      // remove the first line: header
      csvData.shift()

      // create a new connection to the database
      const pool = new Pool({
        host: 'localhost',
        // user: 'postgres',
        // ^^comment this back in when not on Anna's comp^^
        user: 'ania',
        password: 'newPassword',
        // ^^comment these 2 lines out when not on Anna's comp^^
        database: 'coviz',
        port: 5432
      })
      console.log('this is right before query')
      const query =
        'INSERT INTO "jails" ("state","nameOfFacility","date","confirmedResidents","confirmedStaff","deathsResidents","deathsStaff","city","county","latitude","longitude") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)'

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
