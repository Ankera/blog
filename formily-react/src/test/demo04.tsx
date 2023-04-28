import { createForm, onFieldMount, onFieldValueChange } from '@formily/core'
import { createSchemaField } from '@formily/react'
import 'antd/dist/antd.css'
import { Form, FormItem, Input } from '@formily/antd'
const form = createForm({
  effects() {
    //effects 副作用逻辑，用于实现各种联动逻辑
    //用于监听某个字段已挂载的副作用钩子
    onFieldMount('target', (field: any) => {
      //可以设置字段状态
      form.setFieldState(field.query('target'), (state) => {
        if (field.value === '123') {
          state.visible = true
        } else {
          state.visible = false
        }
      })
    })

    //用于监听某个字段值变化的副作用钩子
    onFieldValueChange('source', (field: any) => {
      form.setFieldState(field.query('target'), (state) => {
        if (field.value === '123') {
          state.visible = true
        } else {
          state.visible = false
        }
      })
    })
  },
})
const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
  },
})
const schema = {
  type: 'object',
  properties: {
    source: {
      title: `来源111`,
      type: 'string',
      required: true,
      'x-decorator': 'FormItem', //字段 UI 包装器组件
      'x-component': 'Input', //字段 UI 组件属性
      'x-component-props': {
        //字段 UI 组件属性
        placeholder: '请输入',
      },
    },
    target: {
      title: '目标',
      type: 'string',
      'x-decorator': 'FormItem', //字段 UI 包装器组件
      'x-component': 'Input', //字段 UI 组件属性
      'x-component-props': {
        //字段 UI 组件属性
        placeholder: '请输入',
      },
    },
  },
}
function Demo04() {
  return (
    <Form form={form} labelCol={6} wrapperCol={10}>
      <SchemaField schema={schema} />
    </Form>
  )
}
export default Demo04
