import React, { useState, useMemo } from 'react'
import { createForm, onFormInit, onFormReact } from '@formily/core'

export default function () {
  const [state, setState] = useState('未设置')

  const form = useMemo(() => {
    return createForm({
      effects() {
        onFormInit(() => {
          setState('表单初始化')
        }),
          onFormReact((form) => {
            if (form.values.input === 'hello') {
              setState('hello')
            }
          })
      },
    })
  }, [])

  return (
    <div>
      <p>{state}</p>
      <button
        onClick={() => {
          form.setValuesIn('input', 'hello')
        }}
      >
        改变
      </button>
    </div>
  )
}
