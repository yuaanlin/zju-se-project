import React, { useState } from 'react';
import { Modal, Form } from 'antd';
import { addMedication, updateMedication } from '../../../services/admin/medicine';
import { AddMedicationBody, UpdateMedicationBody } from '../../../services/admin/medicine';
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
    medicationInfo: MedicationInfo | undefined;
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
    const [form] = Form.useForm();
    const [confirmLoading, setConfirmLoading] = useState(false);

    const addMedicationAgent = async (body: AddMedicationBody) => {
        console.log('addMedicationAgent(): ', body);
        let res = await addMedication(body);
        if (res.errorCode != 200) alert(res.errorMsg);
        else console.log(res.errorMsg);
    };

    const updateMedicationAgent = async (medicationId: number, body: UpdateMedicationBody) => {
        console.log('UpdateMedicationAgent(): ', medicationId, ' ', body);
        let res = await updateMedication(medicationId, body);
        if (res.errorCode != 200) alert(res.errorMsg);
        else console.log(res.errorMsg);
    };

    return (
        <Modal
            visible={visible}
            title={modalStatus == MODAL_STATUS.VIEW_MEDICINE_DETAIL
                ? "View Medication Detail"
                : modalStatus == MODAL_STATUS.ADMIN_ADD_MEDICATION
                    ? "Add Medication"
                    : "Update Medication"}
            okText="OK"
            cancelText="Cancel"
            confirmLoading={confirmLoading}
            onCancel={() => {
                form.resetFields();
                onCancel();
            }}
            onOk={() => {
                switch (modalStatus) {
                    case MODAL_STATUS.VIEW_MEDICINE_DETAIL: {
                        onCancel();
                        break;
                    }
                    case MODAL_STATUS.ADMIN_ADD_MEDICATION: {
                        setConfirmLoading(true);
                        form.validateFields()
                            .then(values => {
                                addMedicationAgent(values);
                                form.resetFields();
                                setConfirmLoading(false);
                                onCreate();
                            })
                            .catch(info => {
                                console.log('Validate Failed:', info);
                                setConfirmLoading(false);
                            });
                        break;
                    }
                    case MODAL_STATUS.ADMIN_UPDATE_MEDICATION: {
                        setConfirmLoading(true);
                        form.validateFields()
                            .then(values => {
                                if (medicationInfo != undefined)
                                    updateMedicationAgent(medicationInfo.medication_id, values);
                                form.resetFields();
                                setConfirmLoading(false);
                                onCreate();
                            })
                            .catch(info => {
                                console.log('Validate Failed:', info);
                                setConfirmLoading(false);
                            });
                        break;
                    }
                }

            }}
        >
            {modalStatus == MODAL_STATUS.VIEW_MEDICINE_DETAIL
                ? <ViewMedicineForm values={medicationInfo} />
                : <AddMedicineForm form={form} />}
        </Modal >
    );
};
export default MedicineModal;
