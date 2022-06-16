import AddAppointmentForm from './addAppointmentForm';
import ViewAppointmentForm from './viewAppointmentForm';
import AddAdviceAppointmentForm from './addAdviceAppointmentForm';
import { createAppointment } from '../../../services/patient/appointment';
import { finishConsultation, MedicationItem } from '../../../services/doctor/consultation';
import React from 'react';
import { Modal, Form, message } from 'antd';

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
  consultationId : number | undefined;
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
      if (res.errorCode != 200) {
        message.error(res.errorMsg);
        return;
      }
      message.success('预约创建成功;)');
      return res;
    } catch (e) {
      console.log(e);
      alert(e);
    }
  };

  const updateApp = async (advice: string, medications: Array<MedicationItem>) => {
    try {
      if (!consultationId) {
        message.error('获取预约出错');
        return;
      }
      let res = await finishConsultation(consultationId, { advice: advice, medications: medications });
      if (res.errorCode != 200) {
        message.error(res.errorMsg);
        return;
      }
      message.success('医嘱添加成功;)');
      return res;
    } catch (e) {
      console.log(e);
      alert(e);
    }
  };

  const setModeFunction = (values: any) => {
    let res;
    if(modalStatus === MODAL_STATUS.USER_ADD_APPOINTMENT) {
      res = createApp(values.time);
    } else if (modalStatus === MODAL_STATUS.DOCTOR_EDIT_ADD_APPOINTMENT) {
      res = updateApp(values.advice, values.medications);
    }
    return res;
  };
  const onOK = async (values: any) => {
    form.resetFields();
    let res = await setModeFunction(values);
    onCreate(values);
  };
  return (
    <Modal
      visible={visible}
      title="预约信息"
      okText="确定"
      cancelText="取消"
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={() => {
        form
          .validateFields()
          .then(onOK)
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        style={{ paddingLeft: 50, paddingRight: 50 }}
      >
        {
          modalStatus === MODAL_STATUS.USER_ADD_APPOINTMENT ?
            <AddAppointmentForm /> :
            modalStatus === MODAL_STATUS.USER_VIEW_APPOINTMENT && consultationId ?
              <ViewAppointmentForm consultationId={consultationId} form={form}/> :
              modalStatus === MODAL_STATUS.DOCTOR_EDIT_ADD_APPOINTMENT && consultationId ?
                <AddAdviceAppointmentForm consultationId={consultationId} form={form} /> : null
        }
      </Form>
    </Modal>
  );
};
export default AppointmentModal;
