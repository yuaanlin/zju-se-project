import AddAppointmentForm from './addAppointmentForm';
import ViewAppointmentForm from './viewAppointmentForm';
import AddAdviceAppointmentForm from './addAdviceAppointmentForm';
import {
  cancelAppointment,
  createAppointment,
  getClinicDoctors,
  getDoctorTimeSurplus
} from '../../../services/patient/appointment';
import { finishConsultation } from '../../../services/doctor/consultation';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, Radio, Cascader } from 'antd';

export enum MODAL_STATUS {
  USER_ADD_APPOINTMENT = 1,
  USER_VIEW_APPOINTMENT,
  DOCTOR_EDIT_ADD_APPOINTMENT,

}

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface AppointmentModalProps {
  modalStatus: MODAL_STATUS;
  visible: boolean;
  consultationId : string;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({
  modalStatus,
  visible,
  consultationId,
  onCreate,
  onCancel,
}) => {

  const [form] = Form.useForm();

  const createApp = async (visitId : string) => {
    try {
      let res = await createAppointment(visitId);
      console.log('create success');
    } catch (e) {
      console.log(e);
      alert(e);
    }
  };

  const cancelApp = async (appointmentId : string) => {
    try {
      let res = await cancelAppointment(appointmentId);
      console.log('delete success');
    } catch (e) {
      console.log(e);
      alert(e);
    }
  };

  //TODO: 更新医嘱
  const updateApp = async (appointmentId : number) => {
    try {
      let res = await finishConsultation(appointmentId, { advice: form.getFieldValue('advice'), medications: form.getFieldValue('medications') });
      console.log('update success');
    } catch (e) {
      console.log(e);
      alert(e);
    }
  };
  return (
    <Modal
      visible={visible}
      title="Create a new collection"
      okText="Create"
      cancelText="Cancel"
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
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
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        onValuesChange={(v, all)=>{
          console.log(form.getFieldsValue());
        }}
        style={{ paddingLeft: 50, paddingRight: 50 }}
      >
        {
          modalStatus === MODAL_STATUS.USER_ADD_APPOINTMENT ?
            <AddAppointmentForm /> :
            modalStatus === MODAL_STATUS.USER_VIEW_APPOINTMENT && consultationId != '' ?
              <ViewAppointmentForm consultationId={consultationId} form={form}/> :
              modalStatus === MODAL_STATUS.DOCTOR_EDIT_ADD_APPOINTMENT && consultationId != '' ?
                <AddAdviceAppointmentForm consultationId={consultationId} form={form} /> : null
        }
      </Form>
    </Modal>
  );
};
export default AppointmentModal;
