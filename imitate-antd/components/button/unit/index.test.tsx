import React, { Component } from 'react'
import { mount, render } from 'enzyme'
import Button from '..'

describe('测试Button', () => {
  it('测试Button能否正确挂载', () => {
    // 挂载组件不抛错误
    expect(() => mount(<Button>Follow</Button>)).not.toThrow()
  })
})
