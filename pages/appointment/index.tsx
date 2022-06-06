import SiderMenu from '../component/SiderMenu';
import AppointmentModal, { MODAL_STATUS } from '../component/AppointmentModal/index';
import { getAppointment } from '../../services/patient/appointment';
import { Button, Form, Layout, Space, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
// @ts-ignore
import { PlusOutlined } from '@ant-design/icons';

const { Content } = Layout;

function findColor(tag: number) {
  let t = tagColor.find(x=>x.status == tag);
  return t ? t.color : 'green';
}
type AppointmentType = {
  key: string,
  id: number,
  patient_id: number,
  patient_description:string,
  advice: string,
  state: number,
  docter_id: number,
  docter_name: string,
  clinic_id: string,
  clinic_name: string,
  clinic_desc: string,
  create_time: string,
  visit_id: number,
  visit_time: string,
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
    title: '预约编号',
    dataIndex: 'id',
    key: 'id',
    render: (text:string) => <a>{text}</a>,
  },
  {
    title: '预约科室',
    dataIndex: 'clinic_name',
    key: 'clinic_name',
  },
  {
    title: '预约医生',
    dataIndex: 'docter_name',
    key: 'docter_name',
  },
  {
    title: '日期',
    dataIndex: 'create_time',
    key: 'create_time',
  },
  {
    title: '状态',
    key: 'state',
    dataIndex: 'state',
    //TODO: tag需要设置为interface，设置预约的状态
    render: (tag: any) => (
      <Tag color={findColor(tag)} key={tag}>
        STATUS
      </Tag>
    ),
  },
  {
    title: '操作',
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

export default function AppointmentPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [consultationId, setConsultationId] = useState('');
  const [modalStatus, setModalStatus] = useState(MODAL_STATUS.USER_ADD_APPOINTMENT);
  const [appTable, setAppTable] = useState<AppointmentType[]>([]);
  const onCreate = (values: any) => {
    console.log('Received values of form: ', values);
    setModalVisible(false);
  };

  const getAppointmentList = async () => {
    let res = await getAppointment();
    if (res.errorCode === 402) {
      alert(res.errorMsg);
      return;
    }
    let newappTable = res.payload.consultationInfo.map(x => {
      return { ...x, key: x.id.toString() };
    });
    setAppTable(newappTable);
  };

  useEffect(() => {
    getAppointmentList();
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
          <h1>门诊预约/管理平台</h1>
          <Table
            onRow={record => {
              return {
                onClick: () => {
                  setModalStatus(MODAL_STATUS.DOCTOR_EDIT_ADD_APPOINTMENT);
                  setConsultationId(record.key);
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
          <AppointmentModal
            modalStatus={modalStatus}
            visible={modalVisible}
            consultationId={consultationId}
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
            setModalStatus(MODAL_STATUS.USER_ADD_APPOINTMENT);
            setConsultationId('');
            setModalVisible(true);
          }}
          type="primary"
          shape="circle"
          icon={<PlusOutlined />} />
      </Content>
    </>
  );
}
