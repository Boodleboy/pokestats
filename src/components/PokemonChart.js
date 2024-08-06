import React, { useState, useEffect } from 'react'

import GraphOptions from './GraphOptions'
import BarGraph from './BarGraph'
import LineGraph from './LineGraph'
import Dropdown from './Dropdown'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import lineColors from './LineGraph/lineColors.json'
import useUsageData from '../hooks/useUsageData'


const initialOptions = {
  graphMode: 'bar',
  month: '2024-02', // TODO: make this pull from somewhere central
  gen: 'gen9',
  format: 'ou',
  elo: '0',
  show: 50,
  pokemon: 'Gholdengo'
}

const PokemonChart = () => {
  const [options, setOptions] = useState({ 
    body: initialOptions,
    loading: true
  })

  const usageData = useUsageData(options, setOptions)

  useEffect(() => {
    document.title = "Pokemon Usage History"
  }, [])

  if (options.loading) {
    return (
      <div class="spinner-border" role="status" /> 
    )
  }

  if (usageData.error) {
    return (
      <div> ERROR: {usageData.error.message} </div>
    )
  }

  return (
    <>
      <GraphOptions options={options} setOptions={setOptions} />
      {options.body.graphMode === 'bar' ? 
        <BarGraph options={options} setOptions={setOptions} usageData={usageData} /> : null}
      {options.body.graphMode === 'line' ? 
        <LineGraph options={options} setOptions={setOptions} usageData={usageData.body} /> : null}
    </>
  )
}

export default PokemonChart
