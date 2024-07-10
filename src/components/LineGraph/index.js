import React from 'react'

import { PointElement, LineElement, Chart } from 'chart.js'
import { Line } from 'react-chartjs-2'

import './style.css'

Chart.register(PointElement)
Chart.register(LineElement)

const LineGraph = ({ data }) => {
  const options = {
    spanGaps: false,
  }

  const lineStyle = {
  }

  return (
    <div style={lineStyle} className="line-graph">
      <Line data={data} options={options} />
    </div>
  )
}

export default LineGraph
