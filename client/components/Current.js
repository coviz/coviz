import React from 'react'

export const Current = data => {
  let totalCases = data.data[0].positive.toLocaleString()
  let totalDeaths = data.data[0].death.toLocaleString()
  let date = String(data.data[0].date)
  let year = date.slice(0, 4)
  let month = date.slice(4, 6)
  let day = date.slice(6)
  date = `${month}/${day}/${year}`
  let newCases = data.data[0].positiveIncrease.toLocaleString()
  let newDeaths = data.data[0].deathIncrease.toLocaleString()
  return (
    <div className="totalsBox">
      {/* <u>
        <h3>Current U.S. Totals</h3>
      </u> */}
      <u>
        <h3>Current U.S. Totals As of: {date}</h3>
      </u>
      <div className="totalsFacts">
        {/* <p>Data as of: {date}</p> */}
        <div>
          <p>Total cases: {totalCases} </p>
          <p>Total deaths: {totalDeaths} </p>
        </div>
        <div>
          <p>New cases: {newCases} </p>
          <p>New deaths: {newDeaths} </p>
        </div>
      </div>
    </div>
  )
}
