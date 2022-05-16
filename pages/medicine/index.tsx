import SiderMenu from '../component/SiderMenu';
import AddMedicineModal, { MODAL_STATUS } from '../component/addMedicineModal';
import { Button, Form, Space, Table, Tag } from 'antd';
import { Layout } from 'antd';
import { useState } from 'react';
const { Header, Footer, Sider, Content } = Layout;
import Image from './Image'
import Icon from '@ant-design/icons';
import logo from './medicineIcon.svg';
import styles from '../../styles/Home.module.css';
import Link from 'next/link';
//import MessageSvg from 'path/to/message.svg';

function findColor(tag: number) {
    let t = tagColor.find(x => x.status <= tag);
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

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text: string) => <a>{text}</a>,
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
    },
    {
        title: 'Usage',
        dataIndex: 'usage',
        key: 'usage',
    },
    {
        title: 'Contraindication',
        dataIndex: 'contraindication',
        key: 'contraindication',
    },
    {
        title: 'Medication Surplus',
        dataIndex: 'medicationCnt',
        key: 'medicationCnt',
        render: (medicationCnt: number) => (
            <Tag color={findColor(medicationCnt)}>
                {medicationCnt}
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
        name: '阿司匹林',
        category: 'OTC',
        usage: '成人口服一次0.3~0.6g，一日3次，必要时每4小时1次。',
        contraindication: '非甾体抗炎药过敏者禁用。',
        medicationCnt: 0,
    },
    {
        key: '2',
        name: '999感冒灵',
        category: 'OTC',
        usage: '开水冲服，一次1袋，一日3次。',
        contraindication: '严重肝肾功能不全者禁用。',
        medicationCnt: 1,
    },
    {
        key: '3',
        name: '板蓝根',
        category: '中药',
        usage: '煎服，9-15g。',
        contraindication: '体虚而无实火热毒者忌服，脾胃虚寒者慎用。',
        medicationCnt: 10,
    },
];

export default function MedicinePage() {
    const [modalStatus, setModalStatus] = useState(MODAL_STATUS.VIEW_MEDICINE_DETAIL);
    const [modalVisible, setModalVisible] = useState(false);
    const onCreate = (values: any) => {
        console.log('Received values of form: ', values);
        setModalVisible(false);
    };
    return (
        <Layout>
            <Sider style={{
                background: '#fff',
                padding: 24,
                margin: 0,
                minHeight: 480,
            }}><SiderMenu /></Sider>

            <Layout>
                <Header style={{
                    background: '#fff',
                    padding: 24,
                }}><h1>药物平台</h1></Header>
                <Content
                    className="site-layout-background"
                    style={{
                        background: '#fff',
                        padding: 24,
                        margin: 0,
                        minHeight: 480,
                    }}>
                    <Layout>
                        {/* <Content>Where to place the list</Content>
                        <Sider style={{
                            background: '#fff',
                            padding: 24,
                            margin: 0,
                            minHeight: 480,
                        }}><Image /></Sider> */}
                        <Table
                            onRow={record => {
                                return {
                                    onClick: () => {
                                        setModalStatus(MODAL_STATUS.VIEW_MEDICINE_DETAIL);
                                        setModalVisible(true);
                                    }
                                };
                            }}
                            pagination={{
                                position: ['bottomCenter'],
                                hideOnSinglePage: true,
                                pageSize: 5
                            }}
                            columns={columns}
                            dataSource={data}
                        />
                        <AddMedicineModal
                            modalStatus={modalStatus}
                            visible={modalVisible}
                            onCreate={onCreate}
                            onCancel={() => { setModalVisible(false); }}
                        />
                    </Layout>
                </Content>
                <Footer>
                    <div>medicine system</div>
                    <div>developed by Group3</div>
                </Footer>
            </Layout>

        </Layout>
    );
}
