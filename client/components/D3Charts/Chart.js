import React, {useEffect, useState} from 'react'
import {drawChart, initChart} from './BasicD3'

const dataset = [
  [10, 30, 40, 20],
  [10, 40, 30, 20, 50, 10],
  [60, 30, 40, 20, 30]
]
let i = 0

export const Chart = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    initChart(400, 600)
    changeChart()
  }, [])

  const changeChart = () => {
    drawChart(400, 600, dataset[i++])
    if (i === dataset.length) i = 0
  }

  return (
    <div className="App">
      <h2>Graphs with React</h2>
      <button onClick={changeChart}>Change Data</button>
      <div id="chart" />
    </div>
  )
}
