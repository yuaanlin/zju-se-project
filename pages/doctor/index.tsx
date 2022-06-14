import SiderMenu from '../component/SiderMenu';
import { deleteDoctor, DoctorType, getDoctors, updateDoctor } from '../../services/admin/doctor';
import {
  Button,
  Form,
  Input,
  Layout,
  message,
  Modal,
  Space,
  Table
} from 'antd';
import { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';

const { Content } = Layout;

export default function DoctorPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<DoctorType>();
  const [appTable, setAppTable] = useState<DoctorType[]>([]);
  const [identity, setIdentity] = useState<string|null>('');

  async function onUpdateDoctor(v: DoctorType, n: any) {
    if (!editingDoctor) return;
    const res = await updateDoctor({ ...v, ...n });
    await getDoctorList();
    if (res.errorCode !== 200) {
      message.error(res.errorMsg);
      return;
    }
    setModalVisible(false);
  }

  async function onDeleteClinic(doctor: DoctorType) {
    const res = await deleteDoctor(doctor.id);
    console.log(res);
    if (res.errorCode !== 200) {
      message.error(res.errorMsg);
      return;
    }
    await getDoctorList();
    message.success(`科室 ${doctor.name} 已被删除`);
  }

  const columns = [
    {
      title: '医生编号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '科室名',
      dataIndex: 'clinic',
      key: 'clinic',
    },
    {
      title: '医生',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '手机',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: string, record: DoctorType) => (
        <Space size="middle">
          {
            identity === 'admin' ?
              <>
                {/*<a onClick={() => setEditingClinic(record)}>*/}
                {/*  修改信息*/}
                {/*</a>*/}
                <a onClick={() => onDeleteClinic(record)}>
                  删除
                </a>
              </>: <>没有操作权限</>
          }
        </Space>
      ),
    },
  ];

  const getDoctorList = async () => {
    let res = await getDoctors();
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
    getDoctorList();
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
          <h1>医生/管理平台</h1>
          <Table
            pagination={{
              position: ['bottomCenter'],
              hideOnSinglePage: true,
              pageSize: 5
            }}
            columns={columns}
            dataSource={appTable}
          />
          <UpdateDoctorModal
            doctor={editingDoctor}
            onSubmit={onUpdateDoctor}
            onCancel={() => setEditingDoctor(undefined)} />
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

interface UpdateDoctorModalProps {
  doctor?: DoctorType;
  onSubmit: (values: any, newValue: any) => void;
  onCancel: () => void;
}

const UpdateDoctorModal: React.FC<UpdateDoctorModalProps> = (props) => {
  const {
    doctor,
    onSubmit,
    onCancel
  } = props;

  const [form] = Form.useForm();

  useEffect(() => {
    if (!doctor) return;
    form.setFieldsValue({
      name: doctor.name,
      description: doctor.description
    });
  }, [doctor]);

  return (
    <Modal
      visible={!!doctor}
      title="编辑医生信息"
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
            onSubmit(doctor, values);
            form.resetFields();
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
          label="医生名称"
          rules={[
            {
              required: true,
              message: '请填写医生名称'
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="医生描述"
          rules={[
            {
              required: true,
              message: '请填写医生描述'
            }
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
