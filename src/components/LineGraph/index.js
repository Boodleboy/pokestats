import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer } from 'recharts';

import colors from './lineColors'

import './style.css'

const LineGraph = ({ data }) => {
  const elos = Object.keys(data[0]).filter(key => key != "month")
  return (
    <div className="line-graph" style={{width: "100%", height: "500px"}} >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          {elos.map((elo, i) => {
            return (
              <Line type="monotone" dataKey={elo} stroke={colors[i]} />
            )
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}


export default LineGraph
