import { useState } from 'react'
import { Observer } from './@formily/reactive-react'
import { observable, autorun } from './@formily/reactive'
import Demo01 from './test/demo01'
import Demo02 from './test/demo02'
import Demo03 from './test/demo03'
import Demo04 from './test/demo04'

const username = observable({ value: 'zhufeng' })
const age = observable({ value: 14 })

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Demo01 />
      <Demo02 />
      <Demo03 />
      <Demo04 />
      <Observer>
        {() => (
          <input
            type="text"
            value={username.value}
            onChange={(e: any) => {
              username.value = e.target.value
            }}
          />
        )}
      </Observer>

      <Observer>
        {() => {
          console.log('username')
          return <div>{username.value}</div>
        }}
      </Observer>

      <Observer>
        {() => (
          <input
            type="text"
            value={age.value}
            onChange={(e: any) => {
              age.value = e.target.value
            }}
          />
        )}
      </Observer>

      <Observer>
        {() => {
          console.log('age')
          return <div>{age.value}</div>
        }}
      </Observer>
    </div>
  )
}

export default App
