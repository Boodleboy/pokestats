import React, { useState } from 'react'

import GraphOptions from './GraphOptions'
import BarGraph from './BarGraph'
import LineGraph from './LineGraph'
import Dropdown from './Dropdown'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import lineColors from './LineGraph/lineColors.json'

const initialOptions = {
  graphMode: 'bar',
  month: '2024-02', // TODO: make this pull from somewhere central
  format: 'gen9ou',
  elo: '0',
  show: 50,
  pokemon: 'Gholdengo'
}

const PokemonChart = () => {
  const [options, setOptions] = useState(initialOptions)

  return (
    <>
      <GraphOptions options={options} setOptions={setOptions} />
      {options.graphMode === 'bar' ? 
        <BarGraph options={options} setOptions={setOptions} /> : null}
      {options.graphMode === 'line' ? 
        <LineGraph options={options} setOptions={setOptions} /> : null}
    </>
  )
}

export default PokemonChart
