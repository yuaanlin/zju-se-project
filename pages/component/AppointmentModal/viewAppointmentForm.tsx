import { getVisitTime } from './addAppointmentForm';
import {
  ConsultationRecordType,
  getOneAppointment
} from '../../../services/patient/appointment';
import React, { useEffect, useState } from 'react';
import { Input, Form, FormInstance, message, Select, Button, Descriptions } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

interface ViewAppointmentFormProps {
  consultationId: number;
  form: FormInstance;
}

const ViewAppointmentForm: React.FC<ViewAppointmentFormProps> = ({
  consultationId,
  form
}) => {
  const [value, setValue] = useState<ConsultationRecordType>();
  const getAppointmentInfo = async (value: number) => {
    let res = await getOneAppointment(value);
    if (res.errorCode != 200) {
      console.log(res.errorMsg);
      message.error(res.errorMsg);
      return;
    }
    let currentAppointent = res.payload.ConsultationRecord;
    currentAppointent.visit_time = getVisitTime(currentAppointent.visit_time);
    form.setFieldsValue(currentAppointent);
    setValue(currentAppointent);
  };

  useEffect(() => {
    getAppointmentInfo(consultationId);
  }, []);
  if (!value)
    return<></>;
  return (
    <div>
      <Descriptions >
        <Descriptions.Item label="科室">{value.clinic_name}</Descriptions.Item>
        <Descriptions.Item label="医生">{value.doctor_name}</Descriptions.Item>
        <Descriptions.Item label="就诊时间">{value.visit_time}</Descriptions.Item>
        <Descriptions.Item label="医嘱" span={3}>{value.advice}</Descriptions.Item>
        <Descriptions.Item label="用药" >
          {
            value.medicines ? value.medicines.map((x:any)=>{
              return(
                <div key={x.medication_id}>
                  {x.medication_name} {x.medication_cnt} 份;
                </div>
              );
            }): <div> 没有找到药物 </div>
          }
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};
export default ViewAppointmentForm;
