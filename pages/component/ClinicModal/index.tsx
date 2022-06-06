import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, Radio, Cascader, Select } from 'antd';

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface ClinicModalProps {
  visible: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

const AppointmentModal: React.FC<ClinicModalProps> = ({
  visible,
  onCreate,
  onCancel,
}) => {

  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title="Create a new collection"
      okText="Create"
      cancelText="Cancel"
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        onValuesChange={(v, all)=>{
          console.log(form.getFieldsValue());
        }}
        style={{ paddingLeft: 50, paddingRight: 50 }}
      >
        <Form.Item
          name="name"
          label="科室名称"
          rules={[{ required: true, message: '请填写科室名称' }, ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="科室描述"
          rules={[{ required: true, message: '请填写科室描述' }, ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default AppointmentModal;
