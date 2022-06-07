import SiderMenu from '../component/SiderMenu';
import { getClinics } from '../../services/patient/appointment';
import ClinicModal from '../component/ClinicModal';
import { Button, Layout, message, Space, Table } from 'antd';
import { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';

const { Content } = Layout;

type ClinicType = {
  key: string,
  clinic_id: number,
  name: string,
  description: string
}

const columns = [
  {
    title: '科室编号',
    dataIndex: 'clinic_id',
    key: 'clinic_id',
    render: (text:string) => <a>{text}</a>,
  },
  {
    title: '科室名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '科室描述',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: '操作',
    key: 'action',
    //TODO:record为表的row数据类型，创建接口
    render: (text: any, record: any) => (
      <Space size="middle">
        <a>Delete</a>
      </Space>
    ),
  },
];

export default function ClinicPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [appTable, setAppTable] = useState<ClinicType[]>([]);
  const onCreate = (values: any) => {
    setModalVisible(false);
  };

  const getClinicList = async () => {
    let res = await getClinics();
    if (res.errorCode != 200) {
      message.error(res.errorMsg);
      return;
    }
    let newappTable = res.payload.msg.map(x => {
      return { ...x, key: x.clinic_id.toString() };
    });
    setAppTable(newappTable);
  };

  useEffect(() => {
    getClinicList();
  }, []);
  return (
    <>
      <SiderMenu />
      <Content
        className="site-layout-background"
        style={{
          background: '#fff',
          padding: 24,
          margin: 0,
        }}
      >
        <div>
          <h1>科室/管理平台</h1>
          <Table
            onRow={record => {
              return {
                onClick: () => {
                  setModalVisible(true);
                }
              };
            }}
            pagination={{
              position:['bottomCenter'],
              hideOnSinglePage: true,
              pageSize: 5
            }}
            columns={columns}
            dataSource={appTable}
          />
          <ClinicModal
            visible={modalVisible}
            onCreate={onCreate}
            onCancel={()=>{setModalVisible(false);}}
          />
        </div>
        <Button
          style={{
            position: 'absolute',
            right: 100,
            bottom: 150
          }}
          onClick={()=>{
            setModalVisible(true);
          }}
          type="primary"
          shape="circle"
          icon={<PlusOutlined />} />
      </Content>
    </>
  );
}
