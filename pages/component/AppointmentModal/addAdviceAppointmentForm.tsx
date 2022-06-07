import {
  getClinicDoctors,
  getClinics,
  getDoctorTimeSurplus,
  getOneAppointment
} from '../../../services/patient/appointment';
import { getAllMedicationInfo, treatPatient } from '../../../services/doctor/consultation';
import React, { useEffect, useState } from 'react';
import { Input, Form, FormInstance, Select, message, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

interface AddAdviceAppointmentFormProps {
  consultationId: number;
  form: FormInstance;
}

const AddAdviceAppointmentForm: React.FC<AddAdviceAppointmentFormProps> = ({
  consultationId,
  form
}) => {
  const [medicineList, setMedicineList] = useState<{label:string, value: number}[]>([]);
  const getAppointmentInfo = async (value: number) => {
    let res = await getOneAppointment(value);
    if (res.errorCode != 200) {
      console.log(res.errorMsg);
      message.error(res.errorMsg);
      return;
    }
    let currentAppointent = res.payload;
    form.setFieldsValue(currentAppointent);
  };

  // TODO:查找药物列表
  const getMedicineList = async () => {
    let res = await getAllMedicationInfo();
    if (res.errorCode != 200) {
      console.log(res.errorMsg);
      message.error(res.errorMsg);
      return;
    }
    let newMedicationList = res.payload.medicationInfo.map(x => {
      return { label: x.medication_name, value: x.medication_id };
    });
    setMedicineList(newMedicationList);
  };

  const startTreat = async () => {
    let res = await treatPatient(consultationId);
    if (res.errorCode != 200) {
      message.error(res.errorMsg);
      return;
    }
  };
  useEffect(() => {
    startTreat();
    getAppointmentInfo(consultationId);
    getMedicineList();
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

      <Form.List
        name={['medications']}
        rules={[]}
      >
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field, index) => (
                <div key={field.key}>
                  <Form.Item
                    name={[index, 'medicationID']}
                    label="药物名称"
                    rules={[{ required: true }]}
                  >
                    <Select
                      allowClear
                      options={medicineList}
                    />
                  </Form.Item>
                  <Form.Item
                    label="药物个数"
                    name={[index, 'medicationCnt']}
                    rules={[{ required: true }]}
                  >
                    <Input placeholder={'请输入药物个数'} />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                    />
                  ) : null}
                </div>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{ width: '60%' }}
                >
                  <PlusOutlined /> 添加药物
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>
    </>
  );
};
export default AddAdviceAppointmentForm;
