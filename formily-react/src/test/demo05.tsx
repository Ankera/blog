import React, { useEffect, useCallback, useState } from 'react'
import { Slider } from 'antd'

/**
 * lastIndex = 0
 * b_1
 *
 * lastIndex = 0
 *
 */

const DemoChildren = React.memo((props: any) => {
  /* 只有初始化的时候打印了 子组件更新 */
  console.log('子组件更新')
  useEffect(() => {
    props.getInfo('子组件')
  }, [])
  return <div>子组件</div>
})

const marks = {
  0: '0°C',
  26: '26°C',
  37: '37°C',
  100: {
    style: {
      color: '#f50',
    },
    label: <strong>100°C</strong>,
  },
}

const DemoUseCallback = ({ id }) => {
  const [number, setNumber] = useState(1)
  /* 此时usecallback的第一参数 (sonName)=>{ console.log(sonName) }
    经过处理赋值给 getInfo */
  const getInfo = useCallback(
    (sonName) => {
      console.log(sonName)
    },
    [id]
  )

  const [val, setValue] = useState([10, 20, 30, 40, 50])

  const [mark, setMark] = useState(() => {
    const o = {}
    for (let i = 0; i < val.length; i++) {
      o[val[i]] = `x${val[i]}`
    }
    return o
  })

  // const getInfo = () => {}
  return (
    <div>
      <Slider
        range
        value={val}
        marks={mark}
        onChange={(value) => {
          setValue(value)

          const o = {}
          for (let i = 0; i < value.length; i++) {
            o[value[i]] = `x${value[i]}`
          }
          setMark(o)
        }}
      />

      {/* 点击按钮触发父组件更新 ，但是子组件没有更新 */}
      <button onClick={() => setNumber(number + 1)}>增加{number}</button>
      <DemoChildren getInfo={getInfo} />

      <div>1111</div>
    </div>
  )
}

export default DemoUseCallback
