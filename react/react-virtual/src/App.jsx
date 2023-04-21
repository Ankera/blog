import { useState } from 'react'
import FixedSizeList from './fixed-size-list'
import DynmaicSizeList from './dynmaic-size-list'

function App() {
  return (
    <div className="App">
      <FixedSizeList />

      <hr />

      <DynmaicSizeList />
    </div>
  )
}

export default App
