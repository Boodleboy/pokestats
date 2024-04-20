import React from 'react'

import BarGraph from './BarGraph'
import data from '../data/data.json'

const Main = () => {
  return (
    <>
      <BarGraph data={data.slice(0, 100)} />
    </>
  )
}

export default Main
