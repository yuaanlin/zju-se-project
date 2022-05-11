import SiderMenu from '../component/SiderMenu';
import { Table, Tag, Space, Modal, Layout } from 'antd';
import { useState } from 'react';
const { Content } = Layout;

function findColor(tag: number) {
  let t = tagColor.find(x=>x.status == tag);
  return t ? t.color : 'green';
}
const tagColor = [
  {
    status: 0,
    color: 'blue',
  },
  {
    status: 1,
    color: 'green',
  },
  {
    status: 2,
    color: 'volcano',
  }
];
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text:string) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    //TODO: tag需要设置为interface，设置预约的状态
    render: (tag: any) => (
      <Tag color={findColor(tag)} key={tag}>
        STATUS
      </Tag>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    //TODO:record为表的row数据类型，创建接口
    render: (text: any, record: any) => (
      <Space size="middle">
        <a>Update</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: 0,
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: 1,
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: 2,
  },
];
export default function AppointmentPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => {
    setModalVisible(true);
  };

  const handleOk = () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };
  return (
    <>
      <SiderMenu />
      <Content
        className="site-layout-background"
        style={{
          background: '#fff',
          padding: 24,
          margin: 0,
          minHeight: 480,
        }}
      >
        <div>
          <h1>门诊预约/管理平台</h1>
          <Table
            onRow={record => {
              return { onClick: () => {setModalVisible(true);} };
            }}
            columns={columns}
            dataSource={data}
          />
          <Modal
            title="Basic Modal"
            visible={modalVisible}
            onOk={handleOk}
            onCancel={handleCancel}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
        </div>
      </Content>
    </>
  );
}
