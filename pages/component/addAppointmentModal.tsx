import React, { useState } from 'react';
import { Button, Modal, Form, Input, Radio } from 'antd';

export enum MODAL_STATUS {
  USER_ADD_APPOINTMENT = 1,
  DOCTOR_EDIT_ADD_APPOINTMENT,
}

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface AddAppointmentModalProps {
  modalStatus: MODAL_STATUS;
  visible: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

const AddAppointmentModal: React.FC<AddAppointmentModalProps> = ({
  modalStatus,
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
      onCancel={onCancel}
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
        initialValues={{ modifier: 'public' }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please input the title of collection!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input type="textarea" />
        </Form.Item>
        <Form.Item name="modifier" className="collection-create-form_last-form-item">
          <Radio.Group>
            <Radio value="public">Public</Radio>
            <Radio value="private">Private</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default AddAppointmentModal;
