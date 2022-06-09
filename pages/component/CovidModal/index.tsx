import React from 'react';
import { Modal, Form, message } from 'antd';
import ViewCovidResult from './viewCovidResult';
import {
  cancelAppointment,
  createAppointment,
  getClinicDoctors,
  getDoctorTimeSurplus
} from '../../../services/patient/appointment';

export enum MODAL_STATUS {
  PATIENT_COVID_RESULT_VIEW,
  USER_ADD_APPOINTMENT = 1,
  USER_VIEW_APPOINTMENT,
  DOCTOR_EDIT_ADD_APPOINTMENT,
}

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface CovidtModalProps {
  modalStatus: MODAL_STATUS;
  visible: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

const CovidModal: React.FC<CovidtModalProps>=({
  modalStatus,
  visible,
  onCreate,
  onCancel,  
})=>{
  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title="核酸检测结果"
      okText="明白了"
      cancelText="Cancel"
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={() => {
        
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        onValuesChange={(v, all)=>{
          console.log(all);
        }}
        style={{ paddingLeft: 50, paddingRight: 50 }}
      >
        {
            <ViewCovidResult form ={form}/> 
        }
      </Form>
    </Modal>
  );
}
export default CovidModal;