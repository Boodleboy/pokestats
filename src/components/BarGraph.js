import React from 'react'

import { CategoryScale, LinearScale, BarElement, Chart } from 'chart.js'
import { Bar } from 'react-chartjs-2'

import './BarGraph.css'

Chart.register(CategoryScale)
Chart.register(LinearScale)

Chart.register(BarElement)

const BarGraph = ({ data }) => {
  const barData = {
    labels: data.map(mon => mon.name),
    datasets: [
      {
        label: 'Pokemon usage',
        data: data.map(mon => mon.percent),
        borderwidth: 1,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ]
  }

  return (
    <div class="bar-graph">
      <Bar data={barData} />
    </div>
  )
}

export default BarGraph


