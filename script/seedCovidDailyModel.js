const fs = require('fs')
const Pool = require('pg').Pool
const fastcsv = require('fast-csv')
const db = require('../server/db')

async function createCovidDailyTable() {
  await db.sync()
  await db.close()

  let stream = fs.createReadStream('script/daily_covid_case_counts_112320.csv')
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
        'INSERT INTO "covidDailies" (date, "statecode", "positiveCumulative", "deathCumulative", "positiveIncrease", "deathIncrease", "hospitalizedCurrently", "hospitalizedCumulative", "hospitalizedIncrease") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)'

      pool.connect((err, client, done) => {
        if (err) throw err
        let timer = new Date(2020, 1, 22)
        let lastDate = new Date(2020, 1, 28)

        // let c = '20200222'
        // let year = c.slice(0, 4)
        // year = Number(year)
        // let month = c.slice(4, 6)
        // month = Number(month) - 1
        // let day = c.slice(6, 8)
        // day = Number(day)
        // let rowDate = new Date(year, month, day)
        // console.log('rowDate', rowDate)
        // console.log('timer', timer)
        // console.log('ROWDATE', rowDate.getTime())
        // console.log('TIMER', timer.getTime())
        // console.log(timer.getTime() === rowDate.getTime())

        while (timer <= lastDate) {
          try {
            csvData.forEach(row => {
              let year = row[0].slice(0, 4)
              year = Number(year)
              let month = row[0].slice(4, 6)
              month = Number(month) - 1
              let day = row[0].slice(6, 8)
              day = Number(day)
              let rowDate = new Date(year, month, day)

              if (rowDate.getTime() === timer.getTime()) {
                client.query(query, row, (err, res) => {
                  if (err) {
                    console.log(err.stack)
                  } else {
                    console.log('inserted ' + res.rowCount + ' row:', row)
                  }
                })
              }
              timer = new Date(timer.setDate(timer.getDate() + 2))
            })
          } catch (error) {
            console.log(error)
          }
        }

        // pool.end(() => {
        //   console.log('pool has ended')
        // })
      })
    })

  stream.pipe(csvStream)
}

createCovidDailyTable()

// module.exports = createCovidDailyTable()

// pool.connect((err, client, done) => {

//   let timer = new Date(2020, 0, 22)
//   csvData.forEach((row) => {
//     let year = row[0].slice(0,4)
//     let month= row[0].slice(4,6)
//     let day= row[0].slice(6,8)
//     let rowDate = new Date(year, month, day)

//     if (rowDate.getTime() === timer.getTime()) {
//       client.query(query, row, (err, res) => {
//         if (err) {
//           console.log(err.stack)
//         } else {
//           console.log('inserted ' + res.rowCount + ' row:', row)
//         }
//       })
//     }
//     timer.setDate(timer.getDate() + 2);

// })
// // pool.end(() => {
// //   console.log('pool has ended')
// // })
// })
