import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/react'
import 'antd/dist/antd.css'
import { Form, FormItem, Input, NumberPicker } from '@formily/antd'
const form = createForm()
const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
    NumberPicker,
  },
})

function Demo03() {
  return (
    <Form form={form} labelCol={6} wrapperCol={10}>
      <SchemaField>
        <SchemaField.String
          name="name"
          title="姓名03"
          required
          x-component="Input" //字段 UI 组件属性
          x-decorator="FormItem" //字段 UI 包装器组件
        />
        <SchemaField.Number
          name="age"
          title="年龄03"
          maximum={120}
          x-component="NumberPicker" //字段 UI 组件属性
          x-decorator="FormItem" //字段 UI 包装器组件
        />
      </SchemaField>
    </Form>
  )
}
export default Demo03
