import React from 'react'

import { CategoryScale, LinearScale, BarElement, Chart } from 'chart.js'

import { BarChart, Bar, Rectangle, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import usageData from '../../data/data.json'

import './style.css'

Chart.register(CategoryScale)
Chart.register(LinearScale)

Chart.register(BarElement)

const processBarData = (options, rawData) => {
  const pokemon = rawData.byMonth[options.mode][options.month][options.elo].slice(0, options.show) 
  return pokemon.map(poke => ({
    name: poke.name,
    percent: poke.percent
  }))
}

const BarGraph = ({ options, setOptions }) => {
  const onClick = (bar) => {
    setOptions({
      ...options,
      graphMode: "line",
      pokemon: bar.name
    })
  }

  const data = processBarData(options, usageData)

  return (
    <div style={{width: "90%", height: data.length * 80}}>
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        layout="vertical"
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis type="category" dataKey="name" />
        <Tooltip />
        <Legend />
        <Bar 
          onClick={onClick} 
          dataKey="percent" 
          fill="#8884d8" 
          activeBar={<Rectangle fill="pink" stroke="blue" />} 
          />
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
}

export default BarGraph


