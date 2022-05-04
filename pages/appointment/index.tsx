import { Button, Modal } from 'antd';
import { useState } from 'react';

export default function AppointmentPage() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <div>
      <h1>门诊预约/管理平台</h1>
      <p>
        在 <code>pages/appointment</code> 目录下添加 <code>.tsx</code> 文件，
        即可在这个模块的路由下添加需要的二级路由。
      </p>
      <Button
        onClick={() => {
          setIsModalVisible(true);
        }}>I am a button</Button>
      <Modal title="Basic Modal" visible={isModalVisible}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
}
