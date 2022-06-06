import { getClinicDoctors, getDoctorTimeSurplus, getOneAppointment } from '../../../services/patient/appointment';
import React, { useEffect, useState } from 'react';
import { Input, Form, FormInstance, Select } from 'antd';

interface AddAdviceAppointmentFormProps {
  consultationId: string;
  form: FormInstance;
}

const AddAdviceAppointmentForm: React.FC<AddAdviceAppointmentFormProps> = ({
  consultationId,
  form
}) => {

  const [medicineList, setMedicineList] = useState<{label:string, value: number}[]>([]);

  const getAppointmentInfo = async (value: string) => {
    let res = await getOneAppointment(value);
    if (res.errorCode === 401) {
      console.log(res.errorMsg);
      return;
    }
    let currentAppointent = res.payload;
    form.setFieldsValue(currentAppointent);
  };

  // TODO:查找药物列表
  const getMedicineList = async () => {

  };

  useEffect(() => {
    getAppointmentInfo(consultationId);
    console.log(form.getFieldsValue());
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
        name="docter"
        label="医生"
      >
        <Input
          disabled
        />
      </Form.Item>

      <Form.Item
        name="time"
        label="就诊时间"
      >
        <Input
          disabled
        />
      </Form.Item>

      <Form.Item
        name="advice"
        label="医嘱"
        rules={[{ required: true, message: '请填写医嘱' }, ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="medicine"
        label="药物"
        rules={[{ required: true, message: '请添加药物' }, ]}
      >
        <Select
          // onChange={onClinicChange}
          options={medicineList}
        />
      </Form.Item>
    </>
  );
};
export default AddAdviceAppointmentForm;
