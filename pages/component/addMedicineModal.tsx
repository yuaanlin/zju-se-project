import React, { useState } from 'react';
import { Button, Modal, Form, Input, Radio } from 'antd';
import Image from '../medicine/Image';

export enum MODAL_STATUS {
    VIEW_MEDICINE_DETAIL = 1,
}

interface Values {
    name: string;
    category: string;
    usage: string;
    contraindication: string;
    medicationCnt: number;
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
    const [form] = Form.useForm();
    return (
        <Modal
            visible={visible}
            title="View Medicine Detail"
            okText="OK"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch(info => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Image/>
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{ category: 'Prescription' }}
            >
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: 'Please input the name of medicine!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="category" className="collection-create-form_last-form-item">
                    <Radio.Group>
                        <Radio value="Prescription">Prescription</Radio>
                        <Radio value="OTC">OTC</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item name="usage" label="Usage">
                    <Input type="textarea" />
                </Form.Item>
                <Form.Item name="contraindication" label="Contraindication">
                    <Input type="textarea" />
                </Form.Item>
                <Form.Item name="medicationCnt" label="Medication Surplus">
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};
export default AddMedicineModal;
