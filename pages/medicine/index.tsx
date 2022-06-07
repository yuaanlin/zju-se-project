import SiderMenu from '../component/SiderMenu';
import MedicineModal, { MODAL_STATUS } from '../component/MedicineModal/index';
import { deleteMedication, getAllMedication } from '../../services/admin/medicine';
import { Button, Form, Popconfirm, Space, Table, Tag, Typography } from 'antd';
import { Layout } from 'antd';
import { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
const { Header, Footer, Sider, Content } = Layout;

type MedicationInfo = {
    key: string,
    medication_id: number,
    name: string,
    category: string,
    instruction: string,
    contraindication: string,
    surplus: number
}

function findColor(surplus: number) {
    let t = tagColor.find(x => x.status <= surplus);
    return t ? t.color : 'volcano';
}

const tagColor = [
    {
        status: 10,
        color: 'green',
    },
    {
        status: 1,
        color: 'yellow',
    },
    {
        status: 0,
        color: 'volcano',
    },
];

const data = [
    {
        key: "1",
        medication_id: 1,
        name: '阿司匹林',
        category: 'OTC',
        instruction: '成人口服一次0.3~0.6g，一日3次，必要时每4小时1次。',
        contraindication: '非甾体抗炎药过敏者禁用。',
        surplus: 0,
    },
    {
        key: "2",
        medication_id: 2,
        name: '999感冒灵',
        category: 'OTC',
        instruction: '开水冲服，一次1袋，一日3次。',
        contraindication: '严重肝肾功能不全者禁用。',
        surplus: 1,
    },
    {
        key: "3",
        medication_id: 3,
        name: '板蓝根',
        category: '中药',
        instruction: '煎服，9-15g。',
        contraindication: '体虚而无实火热毒者忌服，脾胃虚寒者慎用。',
        surplus: 10,
    },
];

export default function MedicinePage() {
    const [modalStatus, setModalStatus] = useState(MODAL_STATUS.VIEW_MEDICINE_DETAIL);
    const [modalVisible, setModalVisible] = useState(false);
    const [medicineTable, setMedicineTable] = useState<MedicationInfo[]>([]);
    const [medicationInfo, setMedicationInfo] = useState<MedicationInfo>();
    const onCreate = () => {
        setModalVisible(false);
    };

    const deleteMedicationAgent = async (medicationId: number) => {
        console.log('deleteMedicationAgent(): ', medicationId);
        let res = await deleteMedication(medicationId);
        if (res.errorCode != 200) alert(res.errorMsg);
        else console.log(res.errorMsg);
    };

    const getMedicationList = async () => {
        // let res = await getAllMedication();
        // if (res.errorCode == 402) {
        //     alert(res.errorMsg);
        //     return;
        // }
        // let newMedicineTable = res.payload.medicationInfo.map(x => {
        //     return { key: x.medication_id.toString(), ...x };
        // });
        let newMedicineTable = data;
        setMedicineTable(newMedicineTable);
    };


    const columns = [
        {
            title: '药品名称',
            dataIndex: 'name',
            key: 'name',
            render: (text: string, record: any) => (
                <Typography.Link onClick={() => {
                    console.log('table record view detail onclick: ', record);
                    setMedicationInfo(record);
                    setModalStatus(MODAL_STATUS.VIEW_MEDICINE_DETAIL);
                    setModalVisible(true);
                }}>
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
                <Tag color={findColor(surplus)}>
                    {surplus}
                </Tag>
            ),
        },
        {
            title: '操作',
            key: 'action',
            render: (record: any) => (
                <Space size="middle">
                    <Typography.Link onClick={() => {
                        console.log('table record update onclick: ', record);
                        setMedicationInfo(record);
                        setModalStatus(MODAL_STATUS.ADMIN_UPDATE_MEDICATION);
                        setModalVisible(true);
                    }}>
                        Update
                    </Typography.Link>

                    <Popconfirm title='确认删除' onConfirm={() => {
                        console.log('table record delete onclick: ', record);
                        deleteMedicationAgent(record.medication_id);
                    }}>
                        <a>Delete</a>
                    </Popconfirm>
                </Space >
            ),
        },
    ];

    useEffect(() => { getMedicationList(); }, []);

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
                            pageSize: 5
                        }}
                        columns={columns}
                        dataSource={medicineTable}
                    />
                </div>
                <MedicineModal
                    modalStatus={modalStatus}
                    visible={modalVisible}
                    medicationInfo={medicationInfo}
                    onCreate={onCreate}
                    onCancel={() => { setModalVisible(false); }}
                />
                <Button
                    style={{
                        position: 'absolute',
                        right: 100,
                        bottom: 150
                    }}
                    onClick={() => {
                        setMedicationInfo(undefined);
                        setModalStatus(MODAL_STATUS.ADMIN_ADD_MEDICATION);
                        setModalVisible(true);
                    }}
                    type="primary"
                    shape="circle"
                    icon={<PlusOutlined />} />
            </Content>
        </>
    );
};
