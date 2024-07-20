import React from 'react'

import Dropdown from '../Dropdown'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const GraphOptions = ({ options, setOptions }) => {

  const buildOnSelect = (optionKey) => (ev) => {
    setOptions({ 
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

  const formatOptions = [
    {
      label: 'Gen 9 OU',
      value: 'gen9ou'
    }, {
      label: 'Gen 9 Ubers',
      value: 'gen9ubers'
    }
  ]

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
