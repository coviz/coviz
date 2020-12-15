const fs = require('fs')
const Pool = require('pg').Pool
const fastcsv = require('fast-csv')
const db = require('../server/db')
const connectionString =
  'postgres://uvwoudywlamqec:d9f5e5619ff97970fe450cac1ed73858d420d2443615228dcea65f1ff8179d12@ec2-3-89-230-115.compute-1.amazonaws.com:5432/d5mpo1h40u920n'
async function createCovidDailyTable() {
  await db.sync()
  await db.close()

  let stream = fs.createReadStream(
    'script/datasets/daily_covid_case_counts_112320.csv'
  )
  let csvData = []
  let csvStream = fastcsv
    .parse()
    .on('data', function(row) {
      if (row[2] === '') row[2] = '0'
      if (row[19] === '') row[19] = '0'
      if (row[41] === '') row[41] = '0'
      if (row[46] === '') row[46] = '0'
      if (row[9] === '') row[9] = '0'
      if (row[10] === '') row[10] = '0'
      if (row[48] === '') row[47] = '0'
      const data = [
        row[0],
        row[1],
        row[2],
        row[19],
        row[41],
        row[46],
        row[9],
        row[10],
        row[47]
      ]
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
