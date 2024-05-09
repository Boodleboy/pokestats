import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'

export default ({ title, options = [], onSelect }) => {
  const Items = options.map(({label, value}) => 
    <Dropdown.Item key={value} eventKey={value}>
      {label}
    </Dropdown.Item>
  )

  return (
    <Dropdown onSelect={onSelect} >
      <Dropdown.Toggle variant="success">
        {title}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {Items}
      </Dropdown.Menu>
    </Dropdown>
  )
}
