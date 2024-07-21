import React from 'react'

import Dropdown from '../Dropdown'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import formats from '../../data/formats.json'
import months from '../../data/months.json'

const GraphOptions = ({ options, setOptions }) => {

  const buildOnSelect = (optionKey) => (ev) => {
    setOptions({ 
      ...options,
      [optionKey]: ev
    })
  }

  const onClickBack = (ev) => {
    setOptions({ ...options, graphMode: 'bar' })
  }

  const curFormat = formats.formats.filter(format => format.name === options.format)[0]

  const formatOptions = formats.formats.map(format => ({
    label: format.label,
    value: format.name
  }))

  const eloOptions = curFormat.elos.map(elo => ({
      label: "Above " + elo + " elo",
      value: elo
    }))

  const monthOptions = months
    .slice(months.findIndex(month => month === curFormat.firstMonth))
    .map(month => ({
      label: month,
      value: month
  }))

  return (
    <Row>
      <Col>
        {options.graphMode === 'bar' ?
          <Dropdown title={'Month'} onSelect={buildOnSelect('month')} options={monthOptions} /> :
          <Button onClick={onClickBack}>Back</Button>
        }
      </Col>
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
