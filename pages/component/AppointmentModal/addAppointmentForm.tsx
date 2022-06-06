import { getClinicDoctors, getClinics, getDoctorTimeSurplus } from '../../../services/patient/appointment';
import React, { useEffect, useState } from 'react';
import { Cascader, Form, Select } from 'antd';

const AddAppointmentForm: React.FC = ({}) => {

  const [clinicList, setClinicList] = useState<{label:string, value: number}[]>([]);
  const [docterList, setDocterList] = useState<{label:string, value: number}[]>([]);
  const [timeSurplus, setTimeSurplus] = useState<{label:string, value: string}[]>([]);

  const getClinicList = async () => {
    let res = await getClinics();
    if (res.errorCode === 401) {
      console.log(res.errorMsg);
      return;
    }
    let newClinicList = res.payload.msg.map(x => {
      return { label: x.name, value: x.clinic_id };
    });
    setClinicList(newClinicList);
  };
  const onClinicChange = async (value: any) => {
    let res = await getClinicDoctors(value);
    if (res.errorCode === 401) {
      console.log(res.errorMsg);
      return;
    }
    let newDocterList = res.payload.doctorInfo.map(x => {
      return { label: x.name, value: x.ID };
    });
    setDocterList(newDocterList);
  };

  const onDocterChange = async (value: any) => {
    let res = await getDoctorTimeSurplus(value);
    if (res.errorCode === 401) {
      console.log(res.errorMsg);
      return;
    }
    let newTimeSurplus = res.payload.visitID.map(x => {
      return { label: x, value: x };
    });
    setTimeSurplus(newTimeSurplus);
  };

  useEffect(() => {
    getClinicList();
  }, []);
  return (
    <>
      <Form.Item
        name="clinic"
        label="科室"
        rules={[{ required: true, message: '请选择就诊科室!' }, ]}
      >
        <Select
          // onChange={onClinicChange}
          options={clinicList}
        />
      </Form.Item>

      <Form.Item
        shouldUpdate={(prevValues, currentValues) => prevValues.clinic !== currentValues.clinic}
        name="doctors"
        label="医生"
        rules={[{ required: true, message: '请选择医生!' }, ]}
      >
        <Select
          // onChange={onDocterChange}
          options={docterList}
        />
      </Form.Item>

      <Form.Item
        shouldUpdate={(prevValues, currentValues) => prevValues.doctorID !== currentValues.doctorID}
        name="time"
        label="就诊时间"
        rules={[{ required: true, message: '请选择就诊时间!' }, ]}
      >
        <Select options={timeSurplus} />
      </Form.Item>
    </>
  );
};
export default AddAppointmentForm;
