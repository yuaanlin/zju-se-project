import React from 'react';
import { Form, FormInstance, Input, InputNumber, Radio } from 'antd';

interface ViewMedicationFormProps {
  form: FormInstance<any>;
}

const ViewMedicineForm: React.FC<ViewMedicationFormProps> = ({}) => {
  return (
    <>
      <Form.Item name="name" label="药品名称">
        <Input disabled />
      </Form.Item>

      <Form.Item
        name="category"
        label="药品种类"
        className="collection-create-form_last-form-item"
      >
        <Radio.Group disabled>
          <Radio value="处方药">处方药</Radio>
          <Radio value="非处方药">非处方药</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item name="instruction" label="用法用量">
        <Input disabled />
      </Form.Item>

      <Form.Item name="contraindication" label="使用禁忌">
        <Input disabled />
      </Form.Item>

      <Form.Item name="surplus" label="药品数量">
        <InputNumber disabled />
      </Form.Item>
    </>
  );
};
export default ViewMedicineForm;
