import React, { useState } from 'react'

import BarGraph from './BarGraph'
import LineGraph from './LineGraph'
import data from '../data/data.json'
import Dropdown from './Dropdown'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import lineColors from './LineGraph/lineColors.json'

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
  return pokemon.map(poke => ({
    name: poke.name,
    percent: poke.percent
  }))
}

const processLineData = (options, rawData) => {
  const pokemonData = rawData.byPokemon[options.mode][options.pokemon]
  const elos = Object.keys(pokemonData)
  const months = rawData.months.slice(
    rawData.months.findIndex(
      month => month === rawData.byPokemon[options.mode].firstMonth
    )
  )

  return months.map(month => {
    const ret = {
      month: month
    }

    elos.forEach(elo => {
      ret[elo] = pokemonData[elo][month].percent
    })

    return ret
  })
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
