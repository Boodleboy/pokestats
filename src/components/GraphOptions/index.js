import React from 'react'

import Dropdown from '../Dropdown'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import formats from '../../data/formats.json'
import months from '../../data/months.json'

import './style.css'

const GraphOptions = ({ options, setOptions }) => {

  const buildOnSelect = (optionKey) => (ev) => {
    setOptions({ 
      body: {
        ...options.body,
        [optionKey]: ev
      },
      loading: true
    })
  }

  const onClickBack = (ev) => {
    setOptions({ 
      body: {
        ...options.body, 
        graphMode: 'bar' 
      },
      loading: true
    })
  }

  const curFormat = formats.formats.filter(format => format.name === options.body.format)[0]

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
    <div className='graph-menu'>
      <Row>
        <Col>
          {options.body.graphMode === 'bar' ?
            <Dropdown title={'Month'} onSelect={buildOnSelect('month')} options={monthOptions} /> :
            <Button onClick={onClickBack}>Back</Button>
          }
        </Col>
          {options.body.graphMode === 'bar' ?
            <Col>
              <Dropdown title={'ELO'} onSelect={buildOnSelect('elo')} options={eloOptions} />
            </Col> : null}
        <Col>
          <Dropdown title={'Game Format'} onSelect={buildOnSelect('format')} options={formatOptions} />
       </Col>
      </Row>
    </div>
  )
}

export default GraphOptions
