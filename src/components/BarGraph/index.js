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

  const options = {
    indexAxis: 'y',
    maintainAspectRatio: false,
    onClick: onClick,
    scales: {
      x: {
        min: 0,
        max: 50
      }
    }
  }

  const barStyle = {
    height: data.datasets[0].data.length * 100
  }
  const newData = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <div style={{width: "500px", height: "500px"}}>
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={newData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
      </BarChart>
    </ResponsiveContainer>
    </div>
  );

  return (
    <ResponsiveContainer width="100%" height="100%" >
      <BarChart width={150} height={40} data={newData}>
        <Bar dataKey="val" fill="#8884d8" />
        <XAxis dataKey="name" />
      </BarChart>
    </ResponsiveContainer>
  )

  return (
    <div style={barStyle} className="bar-graph">
      <Bar data={data} options={options} />
    </div>
  )
}

export default BarGraph


