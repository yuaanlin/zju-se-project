import { getClinicDoctors, getClinics, getDoctorTimeSurplus } from '../../../services/patient/appointment';
import React, { useEffect, useState } from 'react';
import { Cascader, Form, message, Select } from 'antd';
export const getVisitTime = (visit_time: string) => {
  let date = visit_time.charAt(0);
  let time = visit_time.charAt(1);
  switch (date){
    case '1':
      date = '星期一';
      break;
    case '2':
      date = '星期二';
      break;
    case '3':
      date = '星期三';
      break;
    case '4':
      date = '星期四';
      break;
    case '5':
      date = '星期五';
      break;
    case '6':
      date = '星期六';
      break;
    case '7':
      date = '星期天';
      break;
  }
  time = time === '1' ? '上午' : '下午';
  return date + time;
};
const AddAppointmentForm: React.FC = ({}) => {

  const [clinicList, setClinicList] = useState<{label:string, value: number}[]>([]);
  const [docterList, setDocterList] = useState<{label:string, value: number}[]>([]);
  const [timeSurplus, setTimeSurplus] = useState<{label:string, value: number}[]>([]);

  const getClinicList = async () => {
    let res = await getClinics();
    if (res.errorCode != 200) {
      console.log(res.errorMsg);
      message.error(res.errorMsg);
      return;
    }
    let newClinicList = res.payload.msg.map(x => {
      return { label: x.name, value: x.clinic_id };
    });
    setClinicList(newClinicList);
  };
  const onClinicChange = async (value: any) => {
    let res = await getClinicDoctors(value);
    if (res.errorCode != 200) {
      message.error(res.errorMsg);
      return;
    }
    let newDocterList = res.payload.doctorInfo.map(x => {
      return { label: x.name, value: x.id };
    });
    setDocterList(newDocterList);
  };

  const onDocterChange = async (value: any) => {
    let res = await getDoctorTimeSurplus(value);
    if (res.errorCode != 200) {
      message.error(res.errorMsg);
      return;
    }
    let newTimeSurplus = res.payload.surplus.map(x => {
      let time = getVisitTime(x.visit_time);
      return { label: time, value: x.id };
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
          onChange={onClinicChange}
          options={clinicList}
        />
      </Form.Item>

      <Form.Item
        shouldUpdate={true}
        name="doctors"
        label="医生"
        rules={[{ required: true, message: '请选择医生!' }, ]}
      >
        <Select
          onChange={onDocterChange}
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
