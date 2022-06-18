import React from 'react';
import { Form, FormInstance, Input, InputNumber, Radio } from 'antd';

interface AddCovidResultFormProps {
  form: FormInstance<any>;
}

const AddCovidResultForm: React.FC<AddCovidResultFormProps> = ({}) => {
  return (
    <>
      <Form.Item
        name="natID"
        label="检测ID"
        rules={[{ required: true, message: '检测ID' }]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        name="state"
        label="检测结果"
        className="collection-create-form_last-form-item"
      >
        <Radio.Group>
          <Radio value= {1}>阳性</Radio>
          <Radio value={2}>阴性</Radio>
        </Radio.Group>
      </Form.Item>
    </>
  );
};
export default AddCovidResultForm;
