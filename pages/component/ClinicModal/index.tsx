import React from 'react';
import { Form, Input, message, Modal } from 'antd';

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
      title="新增科室"
      okText="确认新增"
      cancelText="取消新增"
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
          .catch(async info => {
            await message.error(info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        style={{
          paddingLeft: 50,
          paddingRight: 50
        }}
      >
        <Form.Item
          name="name"
          label="科室名称"
          rules={[
            {
              required: true,
              message: '请填写科室名称'
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="科室描述"
          rules={[
            {
              required: true,
              message: '请填写科室描述'
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default AppointmentModal;
