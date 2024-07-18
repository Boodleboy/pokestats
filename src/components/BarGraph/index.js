import React from 'react'

import { CategoryScale, LinearScale, BarElement, Chart } from 'chart.js'
//import { Bar } from 'react-chartjs-2'

//import { BarChart, Bar, XAxis, ResponsiveContainer } from 'recharts'
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import './style.css'

Chart.register(CategoryScale)
Chart.register(LinearScale)

Chart.register(BarElement)

const BarGraph = ({ data }) => {
  const onClick = (stuff) => {
    console.log(stuff)
  }

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


