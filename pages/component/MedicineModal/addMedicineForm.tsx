import React from 'react';
import { Form, FormInstance, Input, InputNumber, Radio } from 'antd';

interface AddMedicationFormProps {
  form: FormInstance<any>;
}

const AddMedicineForm: React.FC<AddMedicationFormProps> = ({}) => {
  return (
    <>
      <Form.Item
        name="name"
        label="药品名称"
        rules={[{ required: true, message: '请输入药品名称' }]}
      >
        <Input allowClear showCount maxLength={20} />
      </Form.Item>

      <Form.Item
        name="category"
        label="药品种类"
        className="collection-create-form_last-form-item"
      >
        <Radio.Group>
          <Radio value="处方药">处方药</Radio>
          <Radio value="非处方药">非处方药</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item name="instruction" label="用法用量">
        <Input allowClear showCount maxLength={100} />
      </Form.Item>

      <Form.Item name="contraindication" label="使用禁忌">
        <Input allowClear showCount maxLength={100} />
      </Form.Item>

      <Form.Item name="surplus" label="药品数量">
        <InputNumber />
      </Form.Item>
    </>
  );
};
export default AddMedicineForm;
