import { createForm } from '@formily/core'
import { Field } from '@formily/react'
import 'antd/dist/antd.css'
import { Form, FormItem, Input, NumberPicker } from '@formily/antd'
//createForm创建一个 Form 实例，作为 ViewModel 给 UI 框架层消费
const form = createForm()
function Demo02() {
  return (
    <Form form={form} labelCol={6} wrapperCol={10}>
      <Field
        name="name"
        title="姓名"
        required
        component={[Input]}
        decorator={[FormItem]}
      />
      <Field
        name="age"
        title="年龄"
        validator={{ maximum: 5 }}
        component={[NumberPicker]}
        decorator={[FormItem]}
      />
    </Form>
  )
}
export default Demo02
