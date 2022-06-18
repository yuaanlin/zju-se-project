import SiderMenu from '../component/SiderMenu';
import MedicineModal, { MODAL_STATUS } from '../component/MedicineModal/index';
import {
  deleteMedication,
  getAllMedication,
} from '../../services/admin/medicine';
import { Button, Popconfirm, Space, Table, Tag, Typography } from 'antd';
import { Layout } from 'antd';
import { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
const { Content } = Layout;

type MedicationInfo = {
  key: string;
  medication_id: number;
  name: string;
  category: string;
  instruction: string;
  contraindication: string;
  surplus: number;
};

function findColor(surplus: number) {
  let t = tagColor.find((x) => x.status <= surplus);
  return t ? t.color : 'volcano';
}

const tagColor = [
  {
    status: 100,
    color: 'green',
  },
  {
    status: 10,
    color: 'yellow',
  },
  {
    status: 1,
    color: 'volcano',
  },
];

export default function MedicinePage() {
  const [modalStatus, setModalStatus] = useState(
    MODAL_STATUS.VIEW_MEDICINE_DETAIL
  );
  const [isModalVisible, setModalVisible] = useState(false);
  const [medicineTable, setMedicineTable] = useState<MedicationInfo[]>([]);
  const [medicationInfo, setMedicationInfo] = useState<MedicationInfo>();

  const getMedicationList = async () => {
    console.log('getMedicationList()');
    let res = await getAllMedication();
    console.log(res);
    if (res.errorCode != 200) {
      alert(res.errorMsg);
      return;
    }
    let newMedicineTable = res.payload.medicationInfo.map((x) => {
      return { key: x.medication_id.toString(), name: x.medication_name, ...x };
    });
    setMedicineTable(newMedicineTable);
  };

  const deleteMedicationAgent = async (medicationId: number) => {
    console.log('deleteMedicationAgent(): ', medicationId);
    let res = await deleteMedication(medicationId);
    if (res.errorCode != 200) alert(res.errorMsg);
    else console.log(res.errorMsg);
    return res;
  };

  const onCreate = async () => {
    getMedicationList();
    setModalVisible(false);
  };

  const onCancel = async () => {
    getMedicationList();
    setModalVisible(false);
  };

  const columns = [
    {
      title: '药品名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <Typography.Link
          onClick={() => {
            console.log('table record view detail onclick: ', record);
            setMedicationInfo(record);
            setModalStatus(MODAL_STATUS.VIEW_MEDICINE_DETAIL);
            setModalVisible(true);
          }}
        >
          {text}
        </Typography.Link>
      ),
    },
    {
      title: '药品类别',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: '用法用量',
      dataIndex: 'instruction',
      key: 'instruction',
    },
    {
      title: '使用禁忌',
      dataIndex: 'contraindication',
      key: 'contraindication',
    },
    {
      title: '药品数量',
      dataIndex: 'surplus',
      key: 'surplus',
      render: (surplus: number) => (
        <Tag color={findColor(surplus)}>{surplus}</Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (record: any) => (
        <Space size="middle">
          <Typography.Link
            onClick={() => {
              console.log('table record update onclick: ', record);
              setModalStatus(MODAL_STATUS.ADMIN_UPDATE_MEDICATION);
              setMedicationInfo(record);
              setModalVisible(true);
            }}
          >
            修改
          </Typography.Link>

          <Popconfirm
            title="确认删除"
            onConfirm={async () => {
              console.log('table record delete onclick: ', record);
              let res = await deleteMedicationAgent(record.medication_id);
              if (res.errorCode == 200) onCreate();
            }}
          >
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getMedicationList();
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
          <h1>药物平台</h1>
          <Table
            pagination={{
              position: ['bottomCenter'],
              hideOnSinglePage: true,
              pageSize: 5,
            }}
            columns={columns}
            dataSource={medicineTable}
          />
        </div>
        <MedicineModal
          modalStatus={modalStatus}
          visible={isModalVisible}
          medicationInfo={medicationInfo}
          onCreate={onCreate}
          onCancel={onCancel}
        />
        <Button
          style={{
            position: 'absolute',
            right: 100,
            bottom: 150,
          }}
          onClick={() => {
            setModalStatus(MODAL_STATUS.ADMIN_ADD_MEDICATION);
            setMedicationInfo(undefined);
            setModalVisible(true);
          }}
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
        />
      </Content>
    </>
  );
}
