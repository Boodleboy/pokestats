import React from 'react'

import { BarChart, Bar, Rectangle, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import useUsageData from '../../hooks/useUsageData'

import './style.css'

const processBarData = (options, rawData) => {
  const pokemon = rawData.body.slice(0, options.body.show) 
  return pokemon.map(poke => ({
    name: poke.name,
    percent: poke.percent
  }))
}

const BarGraph = ({ options, setOptions, usageData }) => {
  const onClick = (bar) => {
    setOptions({
      body: {
        ...options.body,
        graphMode: "line",
        pokemon: bar.name
      },
      loading: true
    })
  }

  const data = processBarData(options, usageData)
  const labelSize = 140

  return (
    <div style={{width: "90%", height: data.length * 80}}>
      <ResponsiveContainer width="100%" height="100%">
        <h2> Top Used {options.body.format} Pokemon </h2>
        <BarChart
          width={500}
          height={300}
          data={data}
          layout="vertical"
          margin={{
            top: 5,
            right: 30,
            left: labelSize,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" 
            tickFormatter={name => name.replace('-', '- ')}
            tick={{ fontSize: 26 }}
            />
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


