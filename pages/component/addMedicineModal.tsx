import React, { useState } from 'react';
import { Button, Modal, Form, Input, Radio } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Image from '../medicine/Image';
import { getMedication, addMedication } from '../../services/admin/medical';

export enum MODAL_STATUS {
    VIEW_MEDICINE_DETAIL = 1,
}

interface Values {
    name: string;
    category: string;
    instruction: string;
    contraindication: string;
    surplus: number;
}

interface AddMedicineModalProps {
    modalStatus: MODAL_STATUS;
    visible: boolean;
    onCreate: (values: Values) => void;
    onCancel: () => void;
}

const AddMedicineModal: React.FC<AddMedicineModalProps> = ({
    modalStatus,
    visible,
    onCreate,
    onCancel,
}) => {
    const onFinish = (values: any) => {
        console.log(values);
    }

    const [form] = Form.useForm();
    const [confirmLoading, setConfirmLoading] = useState(false);
    return (
        <Modal
            visible={visible}
            title="View Medicine Detail"
            okText="OK"
            cancelText="Cancel"
            confirmLoading={confirmLoading}
            onCancel={onCancel}
            onOk={() => {
                setConfirmLoading(true);
                form.validateFields()
                    .then(values => {
                        console.log(values);
                        // TODO post to backend
                        // addMedication(values);
                        form.resetFields();
                        setConfirmLoading(false);
                        onCreate(values);
                    })
                    .catch(info => {
                        console.log('Validate Failed:', info);
                        setConfirmLoading(false);
                    });
            }}
        >
            <Image />
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                onFinish={onFinish}
                initialValues={{
                    name: '',
                    category: 'Prescription',
                    instruction: '',
                    contraindication: '',
                    surplus: ''
                }}
            >
                <Form.Item name="name" label="Name"
                    rules={[{ required: true, message: 'Please input the name of medicine!' }]}>
                    <Input allowClear showCount maxLength={20} />
                </Form.Item>

                <Form.Item name="category" className="collection-create-form_last-form-item">
                    <Radio.Group>
                        <Radio value="Prescription">Prescription</Radio>
                        <Radio value="OTC">OTC</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item name="instruction" label="Instruction">
                    <TextArea rows={3} />
                </Form.Item>

                <Form.Item name="contraindication" label="Contraindication">
                    <TextArea rows={3} />
                </Form.Item>

                <Form.Item name="surplus" label="Medication Surplus"
                    rules={[{ required: true, message: 'Please input the surplus of medicine!' }]}>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};
export default AddMedicineModal;
