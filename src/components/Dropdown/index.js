import React from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

export default ({ title, options = [], onSelect }) => {
  const Items = options.map(({label, value}) => 
    <Dropdown.Item key={value} eventKey={value}>
      {label}
    </Dropdown.Item>
  )

  return (
    <DropdownButton onSelect={onSelect} title={title} >
      {Items}
    </DropdownButton>
  )
}
