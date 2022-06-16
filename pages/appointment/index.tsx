import SiderMenu from '../component/SiderMenu';
import AppointmentModal, { MODAL_STATUS } from '../component/AppointmentModal/index';
import { cancelAppointment, getAppointment } from '../../services/patient/appointment';
import { getAllConsultation } from '../../services/doctor/consultation';
import { Button, Layout, message, Space, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
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
  doctor_id: number,
  doctor_name: string,
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

export default function AppointmentPage() {
  const [identity, setIdentity] = useState<string|null>('');
  const [modalVisible, setModalVisible] = useState(false);
  const [consultationId, setConsultationId] = useState<number|undefined>(undefined);
  const [modalStatus, setModalStatus] = useState(MODAL_STATUS.USER_ADD_APPOINTMENT);
  const [appTable, setAppTable] = useState<AppointmentType[]>([]);

  const onCreate = () => {
    getAppointmentList();
    setModalVisible(false);
  };
  const cancelApp = async (appointmentId : number) => {
    try {
      let res = await cancelAppointment(appointmentId);
      if (res.errorCode != 200) {
        message.error(res.errorMsg);
        return;
      }
      message.success(res.errorMsg);
      getAppointmentList();
    } catch (e) {
      alert(e);
    }
  };

  const viewApp = (record: any) => {
    setModalStatus(MODAL_STATUS.USER_VIEW_APPOINTMENT);
    setModalVisible(true);
  };

  const updateApp = (record: any) => {
    setModalStatus(MODAL_STATUS.DOCTOR_EDIT_ADD_APPOINTMENT);
    setModalVisible(true);
  };

  const getAppointmentList = async () => {
    let res ;
    if (identity === 'patient')
      res = await getAppointment();
    else
      res = await getAllConsultation();
    if (res.errorCode != 200) {
      message.error(res.errorMsg);
      return;
    }
    let newappTable = res.payload.consultationInfo.map(x => {
      return { ...x, key: x.id.toString() };
    });
    setAppTable(newappTable);
  };

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
      dataIndex: 'doctor_name',
      key: 'doctor_name',
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
      render: (tag: any) => (
        <Tag color={findColor(tag)} key={tag}>
          {tag === 2 ? '已预约' : tag === 4 ? '问诊中' : '已结束'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (text: any, record: any) => (
        <Space size="middle">
          {
            identity === 'doctor' ?
              <Button
                type={'link'}
                onClick={
                  () => {
                    setConsultationId(record.id);
                    updateApp(record.id);
                  }}
              >
                问诊
              </Button> : null
          }
          {
            identity === 'admin' ?
              <Button
                type={'link'}
                onClick={
                  () => {
                    cancelApp(record.id);
                  }}
              >
                删除
              </Button> : null
          }
          <Button
            type={'link'}
            onClick={
              () => {
                setConsultationId(record.id);
                viewApp(record.id);
              }}
          >
            详情
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    let i = localStorage.getItem('identity');
    setIdentity(i);
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
            pagination={{
              position:['bottomCenter'],
              hideOnSinglePage: true,
              pageSize: 5
            }}
            columns={columns}
            dataSource={appTable}
          />
          {
            modalVisible ?
              <AppointmentModal
                visible={true}
                modalStatus={modalStatus}
                consultationId={consultationId}
                onCreate={onCreate}
                onCancel={
                  ()=>{
                    getAppointmentList();
                    setModalVisible(false);
                  }
                }
              /> : null
          }
        </div>
        {
          identity === 'patient' ?
            <Button
              style={{
                position: 'absolute',
                right: 100,
                bottom: 50
              }}
              onClick={()=>{
                setModalStatus(MODAL_STATUS.USER_ADD_APPOINTMENT);
                setConsultationId(undefined);
                setModalVisible(true);
              }}
              type="primary"
              shape="circle"
              icon={<PlusOutlined />} /> : null
        }
      </Content>
    </>
  );
}
