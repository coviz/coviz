const fs = require('fs')
const Pool = require('pg').Pool
const fastcsv = require('fast-csv')
const db = require('../server/db')
const connectionString =
  'postgres://uvwoudywlamqec:d9f5e5619ff97970fe450cac1ed73858d420d2443615228dcea65f1ff8179d12@ec2-3-89-230-115.compute-1.amazonaws.com:5432/d5mpo1h40u920n'

async function createStateTable() {
  await db.sync()
  await db.close()

  let stream = fs.createReadStream('script/datasets/usCapitals.csv')
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
        connectionString: connectionString
      })

      const query =
        'INSERT INTO "states" (state, capital, latitude, longitude, population, "statecode") VALUES ($1, $2, $3, $4, $5, $6)'

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

createStateTable()
