import ViewCovidResult from './viewCovidResult';
import AddCovidResultForm from './addCovidResult';
import{ postCovidResult }from '../../../services/covid/covidTest';
import { Modal, Form } from 'antd';
import React from 'react';
export enum MODAL_STATUS {
  PATIENT_COVID_RESULT_VIEW,
  DOCTOR_COVID_ADD_RESULT
}

interface Values {
  title: string;
  description: string;
  modifier: string;
}

type CovidResult={
  natID: number;
  state: number;
}

interface CovidtModalProps {
  modalStatus: MODAL_STATUS;
  visible: boolean;
  covidResult?:CovidResult;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

const CovidModal: React.FC<CovidtModalProps>=({
  modalStatus,
  visible,
  onCancel,
})=>{
  const [form] = Form.useForm<CovidResult>();

  return (
    <Modal
      visible={visible}
      title="核酸检测结果"
      okText="上传结果"
      cancelText="取消上传"
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={() => {
        //alert('onOK');
        if(modalStatus==MODAL_STATUS.DOCTOR_COVID_ADD_RESULT){
          form.validateFields().then(
            async(values)=>{
              alert(values.natID+' '+values.state);
              let res = await postCovidResult(values.natID, values.state);
              alert('finish await');
              if(res.errorCode!=200){
                alert('post fail!');
              }else{
                alert('post sucess!');
              }
            }

          ).catch((info) => {
            console.log('Covid Result Post Failed:', info);
          });
        }else{
          form.resetFields();
          onCancel();
        }
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
        {modalStatus == MODAL_STATUS.PATIENT_COVID_RESULT_VIEW
          ? <ViewCovidResult form ={form}/>
          : <AddCovidResultForm form ={form}/>
        }
      </Form>
    </Modal>
  );
};
export default CovidModal;
