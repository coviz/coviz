const fs = require('fs')
const Pool = require('pg').Pool
const fastcsv = require('fast-csv')
const db = require('../server/db')
const connectionString =
  'postgres://ngzkezcbdbrhah:4f712c9e90a2eeca1c40e8aad69062f2c468475d911c6c4a2611bc62ea006c03@ec2-54-235-116-235.compute-1.amazonaws.com:5432/dddc7ahebtdgje'

async function createStateTable() {
  await db.sync()
  await db.close()

  let stream = fs.createReadStream('script/usCapitals.csv')
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

// module.exports = createStateTable()
