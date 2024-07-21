import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer } from 'recharts';

import usageData from '../../data/data.json'
import months from '../../data/months.json'

import colors from './lineColors'

import './style.css'

const processLineData = (options, rawData) => {
  const pokemonData = rawData.byPokemon[options.format][options.pokemon]
  const elos = Object.keys(pokemonData)
  const formatMonths = months.slice(
    months.findIndex(
      month => month === rawData.byPokemon[options.format].firstMonth
    )
  )

  return formatMonths.map(month => {
    const ret = {
      month: month
    }

    elos.forEach(elo => {
      ret[elo] = pokemonData[elo][month].percent
    })

    return ret
  })
}

const LineGraph = ({ options, setOptions }) => {
  const data = processLineData(options, usageData)
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
              <Line key={elo} type="monotone" dataKey={elo} stroke={colors[i]} />
            )
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}


export default LineGraph
