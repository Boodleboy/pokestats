import React from 'react'

import { CategoryScale, LinearScale, BarElement, Chart } from 'chart.js'
import { Bar } from 'react-chartjs-2'

import './style.css'

Chart.register(CategoryScale)
Chart.register(LinearScale)

Chart.register(BarElement)

const BarGraph = ({ data }) => {

  const options = {
    indexAxis: 'y',
    maintainAspectRatio: false,
    scales: {
      x: {
        min: 0,
        max: 50
      }
    }
  }

  const barStyle = {
    height: Object.keys(data).length * 100
  }

  return (
    <div style={barStyle} className="bar-graph">
      <Bar data={data} options={options} />
    </div>
  )
}

export default BarGraph


