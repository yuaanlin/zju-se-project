import SiderMenu from '../component/SiderMenu';
import {
  getVisits,
  createVisit,
  deleteVisit,
} from '../../services/admin/visit';
import { VisitType } from '../../services/admin/visit';
import { getVisitTime } from '../component/AppointmentModal/addAppointmentForm';
import { DoctorType, getDoctors } from '../../services/admin/doctor';
import {
  Button,
  Form,
  Input,
  Layout,
  message,
  Modal, Select,
  Space,
  Table
} from 'antd';
import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';

const { Content } = Layout;

export default function VisitPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [appTable, setAppTable] = useState<VisitType[]>([]);
  const [identity, setIdentity] = useState<string|null>('');

  async function onCreateVisit(v: any) {
    const res = await createVisit(v.doctorID, v.visitTime);
    await getVisitList();
    if (res.errorCode !== 200) {
      message.error(res.errorMsg);
      return;
    }
    message.success(res.errorMsg);
    setModalVisible(false);
  }

  async function onDeleteVisit(visit: VisitType) {
    const res = await deleteVisit(visit.id);
    console.log(res);
    if (res.errorCode !== 200) {
      message.error(res.errorMsg);
      return;
    }
    message.success(`问诊 ${visit.visit_time} 已被删除`);
    await getVisitList();
  }

  const columns = [
    {
      title: '问诊编号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '医生编号',
      dataIndex: 'doctor_id',
      key: 'doctor_id',
    },
    {
      title: '剩余人数',
      dataIndex: 'number_of_patients',
      key: 'number_of_patients',
    },
    {
      title: '问诊时间',
      dataIndex: 'visit_time',
      key: 'visit_time',
      render: (_: string, record: VisitType) => (
        <Space size="middle">
          {record.visit_time ? getVisitTime(record.visit_time) : null}
        </Space>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: string, record: VisitType) => (
        <Space size="middle">
          {
            identity === 'admin' ?
              <>
                <a onClick={() => onDeleteVisit(record)}>
                  删除
                </a>
              </>: <>没有操作权限</>
          }
        </Space>
      ),
    },
  ];

  const getVisitList = async () => {
    let res = await getVisits();
    console.log(res);
    if (res.errorCode != 200) {
      message.error(res.errorMsg);
      return;
    }
    let newappTable = res.payload.msg.map(x => {
      return {
        ...x,
        key: x.id.toString()
      };
    });
    setAppTable(newappTable);
  };

  useEffect(() => {
    let i = localStorage.getItem('identity');
    setIdentity(i);
    getVisitList();
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
          minHeight: '100vh'
        }}
      >
        <div>
          <h1>问诊/管理平台</h1>
          <Table
            pagination={{
              position: ['bottomCenter'],
              hideOnSinglePage: true,
              pageSize: 5
            }}
            columns={columns}
            dataSource={appTable}
          />
          <VisitModal
            visible={modalVisible}
            onCreate={onCreateVisit}
            onCancel={() => {
              setModalVisible(false);
            }}
          />
        </div>
        {
          identity === 'admin' ?
            <Button
              style={{
                position: 'absolute',
                right: 100,
                bottom: 150
              }}
              onClick={() => {
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

const timeListValue = [
  '11',
  '12',
  '21',
  '22',
  '31',
  '32',
  '41',
  '42',
  '51',
  '52',
  '61',
  '62',
  '71',
  '72',
];
const timeList = timeListValue.map(x=>{
  return { label: getVisitTime(x), value: x };
});

interface Values {
  doctorID: number, visitTime: string
}

interface VisitModalProps {
  visible: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

const VisitModal: React.FC<VisitModalProps> = (props) => {
  const {
    visible,
    onCreate,
    onCancel
  } = props;
  const [docterList, setDoctorList] = useState<{label: string, value: number}[]>([]);
  const [form] = Form.useForm();

  const getDoctorList = async () => {
    let res = await getDoctors();
    if (res.errorCode != 200) {
      message.error(res.errorMsg);
      return;
    }
    let docList = res.payload.msg.map(x => {
      return { label: x.name, value: x.id };
    });
    setDoctorList(docList);
  };
  useEffect(()=> {
    getDoctorList();
  }, []);

  return (
    <Modal
      visible={visible}
      title="新增医生问诊时间"
      okText="送出"
      cancelText="取消"
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
          name="doctorID"
          label="医生"
          rules={[
            {
              required: true,
              message: '请选择医生名称'
            },
          ]}
        >
          <Select
            options={docterList}
          />
        </Form.Item>

        <Form.Item
          name="visitTime"
          label="就诊时间"
          rules={[
            {
              required: true,
              message: '请填写科室描述'
            },
          ]}
        >
          <Select
            options={timeList}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
