const fs = require('fs')
const Pool = require('pg').Pool
const fastcsv = require('fast-csv')
const db = require('../server/db')

async function createTable() {
  await db.sync({force:true})
  await db.close()
  console.log('this is inside createTable')
  // let stream = fs.createReadStream('script/CO2emissions.csv')
  // let stream = fs.createReadStream('script/co2Emissions(1type).csv')
  // let stream = fs.createReadStream('script/co2Emissions-dateAndVal.csv')
  let stream = fs.createReadStream('script/totalCO2Emissions.csv')
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
        // user: 'postgres',
        // ^^comment this 1 line in when not on Anna's comp^^
        user: 'ania',
        password: 'newPassword',
        // ^^comment these 2 lines out when not on Anna's comp^^
        database: 'coviz',
        port: 5432
      })
      console.log('this is right before query')
      const query =
        'INSERT INTO environments (code, date, value, description) VALUES ($1, $2, $3, $4)'
      // const query =
      //   'INSERT INTO environments (date, value) VALUES ($1, $2)'

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
