import React from 'react'

import { PointElement, LineElement, Chart } from 'chart.js'
import { Line } from 'react-chartjs-2'

import './style.css'

Chart.register(PointElement)
Chart.register(LineElement)

const LineGraph = ({ data }) => {
  const lineData = {
    labels: [1, 2, 3, 4, 5],
    datasets: [
      {
        label: 'first',
        data: [1, 3, null, 3, 1],
        borderColor: "rgba(75,192,192,1)"
      },
      {
        label: 'second',
        data: [1, 3, 5, 7, 5],
        borderColor: "#742774"
      }
    ]
  }

  const options = {
    spanGaps: false,
  }

  const lineStyle = {
  }

  return (
    <div style={lineStyle} className="line-graph">
      <Line data={lineData} options={options} />
    </div>
  )
}

export default LineGraph
