import {
  getClinicDoctors,
  getDoctorTimeSurplus,
  getOneAppointment,
  GetOneAppointmentResponse
} from '../../../services/patient/appointment';
import React, { useEffect, useState } from 'react';
import { Input, Form, FormInstance } from 'antd';

interface ViewAppointmentFormProps {
  consultationId: string;
  form: FormInstance;
}

const ViewAppointmentForm: React.FC<ViewAppointmentFormProps> = ({
  consultationId,
  form
}) => {
  // TODO: 根据id找到appointment值，显示即可
  const getAppointmentInfo = async (value: string) => {
    let res = await getOneAppointment(value);
    if (res.errorCode === 401) {
      console.log(res.errorMsg);
      return;
    }
    let currentAppointent = res.payload;
    form.setFieldsValue(currentAppointent);
  };

  useEffect(() => {
    // getAppointmentInfo(consultationId);
  }, []);

  return (
    <>
      <Form.Item
        name="clinic"
        label="科室"
      >
        <Input
          disabled
        />
      </Form.Item>

      <Form.Item
        name="docName"
        label="医生"
      >
        <Input
          disabled
        />
      </Form.Item>

      <Form.Item
        name="dateTime"
        label="就诊时间"
      >
        <Input
          disabled
        />
      </Form.Item>

      <Form.Item
        name="advice"
        label="医嘱"
      >
        <Input
          disabled
        />
      </Form.Item>
    </>
  );
};
export default ViewAppointmentForm;
