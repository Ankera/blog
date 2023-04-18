import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Button from '.'

export default {
  title: '通用/Button',
  component: Button,
} as ComponentMeta<typeof Button>
// 定义一个组件故事模式
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

// 基本组件
export const Basic = Template.bind({})

// 组件属性
Basic.args = {
  children: '按钮',
}
