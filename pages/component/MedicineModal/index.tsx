import React, { useEffect, useState } from 'react';
import { Modal, Form } from 'antd';
import { AddMedicationBody, UpdateMedicationBody } from '../../../services/admin/medicine';
import { addMedication, updateMedication } from '../../../services/admin/medicine';
import AddMedicineForm from './addMedicineForm';
import ViewMedicineForm from './viewMedicineForm';

export enum MODAL_STATUS {
    VIEW_MEDICINE_DETAIL = 1,
    ADMIN_ADD_MEDICATION,
    ADMIN_UPDATE_MEDICATION
}

type MedicationInfo = {
    key: string,
    medication_id: number,
    name: string,
    category: string,
    instruction: string,
    contraindication: string,
    surplus: number
}

interface MedicineModalProps {
    modalStatus: MODAL_STATUS;
    visible: boolean;
    medicationInfo?: MedicationInfo;
    onCreate: () => void;
    onCancel: () => void;
}

const MedicineModal: React.FC<MedicineModalProps> = ({
    modalStatus,
    visible,
    medicationInfo,
    onCreate,
    onCancel,
}) => {
    const [form] = Form.useForm<MedicationInfo>();
    const [title, setTitle] = useState('');
    const [confirmLoading, setConfirmLoading] = useState(false);
    const emptyValue: MedicationInfo = {
        key: '-1',
        medication_id: -1,
        name: '',
        category: '',
        instruction: '',
        contraindication: '',
        surplus: 0
    }

    const addMedicationAgent = async (body: AddMedicationBody) => {
        console.log('addMedicationAgent(): ', body);
        let res = await addMedication(body);
        if (res.errorCode != 200) alert(res.errorMsg);
        else console.log(res.errorMsg);
        return res;
    };

    const updateMedicationAgent = async (medicationId: number, body: UpdateMedicationBody) => {
        console.log('UpdateMedicationAgent(): ', medicationId, ' ', body);
        let res = await updateMedication(medicationId, body);
        if (res.errorCode != 200) alert(res.errorMsg);
        else console.log(res.errorMsg);
        return res;
    };

    useEffect(() => {
        console.log('MedicineModal useEffect()', medicationInfo);
        form.setFieldsValue(medicationInfo != undefined ? medicationInfo : emptyValue);
        console.log(form.getFieldsValue());
    }, [medicationInfo]);

    useEffect(() => {
        switch (modalStatus) {
            case MODAL_STATUS.VIEW_MEDICINE_DETAIL:
                setTitle('View Medication Detail');
                break;
            case MODAL_STATUS.ADMIN_ADD_MEDICATION:
                setTitle('Add Medication');
                break;
            case MODAL_STATUS.ADMIN_UPDATE_MEDICATION:
                setTitle('Update Medication');
                break;
        }
    }, [modalStatus]);

    return (
        <Modal
            visible={visible}
            title={title}
            confirmLoading={confirmLoading}
            onOk={() => {
                switch (modalStatus) {
                    case MODAL_STATUS.VIEW_MEDICINE_DETAIL: {
                        break;
                    }
                    case MODAL_STATUS.ADMIN_ADD_MEDICATION: {
                        setConfirmLoading(true);
                        form.validateFields()
                            .then(async values => {
                                let res = await addMedicationAgent(values);
                                setConfirmLoading(false);
                                if (res.errorCode == 200) {
                                    onCreate();
                                    form.resetFields();
                                }
                            })
                            .catch(info => {
                                setConfirmLoading(false);
                                console.log('Validate Failed:', info);
                            });
                        break;
                    }
                    case MODAL_STATUS.ADMIN_UPDATE_MEDICATION: {
                        setConfirmLoading(true);
                        form.validateFields()
                            .then(async values => {
                                if (medicationInfo != undefined) {
                                    let res = await updateMedicationAgent(medicationInfo.medication_id, values);
                                    setConfirmLoading(false);
                                    if (res.errorCode == 200) {
                                        onCreate();
                                        form.resetFields();
                                    }
                                }
                            })
                            .catch(info => {
                                setConfirmLoading(false);
                                console.log('Validate Failed:', info);
                            });
                        break;
                    }
                }
            }}
            onCancel={onCancel}
        >
            <Form
                form={form}
                name="form_in_modal"
                initialValues={form.getFieldsValue()}
            >
                {modalStatus == MODAL_STATUS.VIEW_MEDICINE_DETAIL
                    ? <ViewMedicineForm form={form} />
                    : <AddMedicineForm form={form} />}
            </Form>
        </Modal >
    );
};
export default MedicineModal;
