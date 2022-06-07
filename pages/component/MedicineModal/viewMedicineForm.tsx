import React from 'react';
import { Form, Input, InputNumber } from 'antd';
import { GetMedicationResponse } from '../../../services/admin/medicine';

interface ViewMedicationFormProps {
    values: GetMedicationResponse | undefined
}

const ViewMedicineForm: React.FC<ViewMedicationFormProps> = ({ values }) => {
    return (
        <Form
            name="form_in_modal"
            initialValues={values}
        >
            <Form.Item name="name" label="药品名称">
                <Input disabled />
            </Form.Item>

            <Form.Item name="category" label="药品种类" className="collection-create-form_last-form-item">
                <Input disabled />
            </Form.Item>

            <Form.Item name="instruction" label="用法用量">
                <Input disabled />
            </Form.Item>

            <Form.Item name="contraindication" label="使用禁忌">
                <Input disabled />
            </Form.Item>

            <Form.Item name="surplus" label="药品数量">
                <InputNumber disabled />
            </Form.Item>
        </Form>
    );
};
export default ViewMedicineForm;
