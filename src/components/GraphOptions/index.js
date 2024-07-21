import React from 'react'

import Dropdown from '../Dropdown'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import formats from '../../data/formats.json'

const GraphOptions = ({ options, setOptions }) => {

  const buildOnSelect = (optionKey) => (ev) => {
    setOptions({ 
      ...options,
      [optionKey]: ev
    })
  }

  const formatOptions = formats.formats.map(format => ({
    label: format.label,
    value: format.name
  }))

  const eloOptions = formats.formats
    .filter(format => format.name === options.format)[0]
    .elos.map(elo => ({
      label: "Above " + elo + " elo",
      value: elo
    }))

  return (
    <Row>
      <Col>
        <Dropdown title={'ELO'} onSelect={buildOnSelect('elo')} options={eloOptions} />
      </Col>
      <Col>
        <Dropdown title={'Game Format'} onSelect={buildOnSelect('format')} options={formatOptions} />
      </Col>
    </Row>
  )
}

export default GraphOptions
