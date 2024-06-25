import React, { useState } from 'react'

import BarGraph from './BarGraph'
import data from '../data/data.json'
import Dropdown from './Dropdown'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const initialOptions = {
  graphMode: 'bar',
  month: '2024-02', // TODO: make this pull from somewhere central
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

  console.log(options)
  const buildOnSelect = (optionKey) => (ev) => {
    console.log(optionKey, ev)
    changeOptions({ 
      ...options,
      [optionKey]: ev
    })
  }

  const eloOptions = [
    {
      label: '0',
      value: '0'
    }, {
      label: '1500',
      value: '1500'
    }
  ]

  const modeOptions = [
    {
      label: 'Gen 9 OU',
      value: 'gen9ou'
    }, {
      label: 'Gen 9 Ubers',
      value: 'gen9ubers'
    }
  ]

  if (options.graphMode === 'bar') {
    return (
      <>
        <Row>
          <Col>
            <Dropdown title={'ELO'} onSelect={buildOnSelect('elo')} options={eloOptions} />
          </Col>
          <Col>
            <Dropdown title={'GameMode'} onSelect={buildOnSelect('mode')} options={modeOptions} />
          </Col>
        </Row>
        <BarGraph data={graphData} />

      </>
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
        Error: bad graphMode: {options.graphMode}
      </>
    )
  }
}

export default PokemonChart
