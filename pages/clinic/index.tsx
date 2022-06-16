import SiderMenu from '../component/SiderMenu';
import { getClinics } from '../../services/patient/appointment';
import ClinicModal from '../component/ClinicModal';
import {
  createClinic,
  deleteClinic,
  updateClinic
} from '../../services/admin/clinic';
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

type ClinicType = {
  key: string,
  clinic_id: number,
  name: string,
  description: string
}

export default function ClinicPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingClinic, setEditingClinic] = useState<ClinicType>();
  const [appTable, setAppTable] = useState<ClinicType[]>([]);
  const [identity, setIdentity] = useState<string|null>('');

  async function onCreateClinic(v: any) {
    const res = await createClinic(v.name, v.description);
    await getClinicList();
    if (res.errorCode !== 200) {
      message.error(res.errorMsg);
      return;
    }
    message.success(res.errorMsg);
    setModalVisible(false);
  }

  async function onUpdateClinic(v: any) {
    if (!editingClinic) return;
    const res = await updateClinic(
      editingClinic.clinic_id, v.name, v.description);
    if (res.errorCode !== 200) {
      message.error(res.errorMsg);
      return;
    }
    message.success('科室更改成功;)');
    await getClinicList();
    setModalVisible(false);
  }

  async function onDeleteClinic(clinic: ClinicType) {
    const res = await deleteClinic(clinic.clinic_id);
    await getClinicList();
    if (res.errorCode !== 200) {
      message.error(res.errorMsg);
      return;
    }
    message.success(`科室 ${clinic.name} 已被删除`);
  }

  const columns = [
    {
      title: '科室编号',
      dataIndex: 'clinic_id',
      key: 'clinic_id',
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
      render: (_: string, record: ClinicType) => (
        <Space size="middle">
          {
            identity === 'admin' ?
              <>
                <a onClick={() => setEditingClinic(record)}>
                  修改信息
                </a>
                <a onClick={() => onDeleteClinic(record)}>
                  删除
                </a>
              </>: <>没有操作权限</>
          }
        </Space>
      ),
    },
  ];

  const getClinicList = async () => {
    let res = await getClinics();
    if (res.errorCode != 200) {
      message.error(res.errorMsg);
      return;
    }
    let newappTable = res.payload.msg.map(x => {
      return {
        ...x,
        key: x.clinic_id.toString()
      };
    });
    setAppTable(newappTable);
  };

  useEffect(() => {
    let i = localStorage.getItem('identity');
    setIdentity(i);
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
          minHeight: '100vh'
        }}
      >
        <div>
          <h1>科室/管理平台</h1>
          <Table
            onRow={record => {
              return {
                onClick: () => {
                }
              };
            }}
            pagination={{
              position: ['bottomCenter'],
              hideOnSinglePage: true,
              pageSize: 5
            }}
            columns={columns}
            dataSource={appTable}
          />
          <ClinicModal
            visible={modalVisible}
            onCreate={onCreateClinic}
            onCancel={() => {
              setModalVisible(false);
            }}
          />
          <UpdateClinicModal
            clinic={editingClinic}
            onSubmit={onUpdateClinic}
            onCancel={() => setEditingClinic(undefined)} />
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

interface UpdateClinicModalProps {
  clinic?: ClinicType;
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

const UpdateClinicModal: React.FC<UpdateClinicModalProps> = (props) => {
  const {
    clinic,
    onSubmit,
    onCancel
  } = props;

  const [form] = Form.useForm();

  useEffect(() => {
    if (!clinic) return;
    form.setFieldsValue({
      name: clinic.name,
      description: clinic.description
    });
  }, [clinic]);

  return (
    <Modal
      visible={!!clinic}
      title="编辑科室信息"
      okText="确定"
      cancelText="取消"
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            onSubmit(values);
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
            }
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
