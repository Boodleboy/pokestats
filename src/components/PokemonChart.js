import React, { useState } from 'react'

import BarGraph from './BarGraph'
import data from '../data/data.json'

const initialOptions = {
  graphMode: 'bar',
  month: '2024-03', // TODO: make this pull from somewhere central
  mode: 'gen9ou',
  elo: '0',
  show: 50
}

const processData = (options, rawData) => {
  if (options.graphMode === 'bar') {
    return rawData.byMonth[options.mode][options.month][options.elo].slice(0, options.show) 
  }
  else {
    return [{
      name: 'not done'
    }]
  }
}

const PokemonChart = () => {
  const [options, changeOptions] = useState(initialOptions)
  const graphData = processData(options, data)
  console.log(initialOptions)

  if (options.graphMode === 'bar') {
    return (
      <BarGraph data={graphData} />
    )
  } else if (options.graphMode === 'line') {
    return (
      <>
        placeholder
      </>
    )
  } else {
    return (
      <>
        line not implemented
      </>
    )
  }
}

export default PokemonChart
