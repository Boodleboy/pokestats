import React, { useState } from 'react'

import BarGraph from './BarGraph'
import LineGraph from './LineGraph'
import data from '../data/data.json'
import Dropdown from './Dropdown'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const initialOptions = {
  graphMode: 'line',
  month: '2024-02', // TODO: make this pull from somewhere central
  mode: 'gen9ou',
  elo: '0',
  show: 50,
  pokemon: 'Gholdengo'
}

const processBarData = (options, rawData) => {
  const pokemon = rawData.byMonth[options.mode][options.month][options.elo].slice(0, options.show) 
  return {
    labels: pokemon.map(mon => mon.name),
    datasets: [
      {
        label: 'Pokemon usage',
        data: pokemon.map(mon => mon.percent),
        borderwidth: 1,
        borderColor: 'rgb(255, 255, 255)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ]
  }
}

const processLineData = (options, rawData) => {
  const pokemonData = rawData.byPokemon[options.mode][options.pokemon]
  const elos = Object.keys(pokemonData)
  const months = rawData.months.slice(
    rawData.months.findIndex(
      month => month === rawData.byPokemon[options.mode].firstMonth
    )
  )

  const datasets = elos.map(elo => {
    return {
      label: elo,
      data: months.map(month => pokemonData[elo][month].percent),
      borderColor: "rgba(100, 100, 100, 1)"
    }
  })
    
  const lineData = {
    labels: months,
    datasets: datasets
  }

  return lineData
}

const PokemonChart = () => {
  const [options, changeOptions] = useState(initialOptions)

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
    const graphData = processBarData(options, data)
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
    const graphData = processLineData(options, data)
    return (
      <>
        <LineGraph data={graphData} /> 
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
