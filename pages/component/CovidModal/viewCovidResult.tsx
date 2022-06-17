import {
  GetLatestCovidResultResponse,
  getLatestCovidResultResponse
} from '../../../services/covid/covidTest';
import { getVisitTime } from '../AppointmentModal/addAppointmentForm';
import React, { useEffect, useState } from 'react';
import { FormInstance, message, Descriptions } from 'antd';

interface ViewCovidResultFormProps {
    form: FormInstance;
  }
const ViewCovidResult: React.FC<ViewCovidResultFormProps>=(
  { form }
)=>{
  const[value, setValue] = useState<GetLatestCovidResultResponse>();
  const getCovidResultInfo = async()=>{
    //alert("here");
    let res = await getLatestCovidResultResponse();
    if(res.errorCode!=200){
      console.log(res.errorMsg);
      message.error(res.errorMsg);
      return;
    }
    let currentResult = res.payload;
    if(currentResult.report_time == undefined){
      currentResult.report_time = '暂未出结果';
    }else{
      currentResult.report_time = getVisitTime(currentResult.report_time);
    }

    form.setFieldsValue(currentResult);
    setValue(currentResult);
  };
  useEffect(()=>{
    getCovidResultInfo();
  }, []);

  //if (!value)
  return(
    <div>
      <Descriptions>

        <Descriptions.Item label="报告状态">
          { value?.report_time === '暂未出结果' ? '未出具' : '已出具' }
        </Descriptions.Item>

        <Descriptions.Item label="报告时间">
          { value?.report_time === '暂未出结果' ? 'NULL' : value?.report_time }
        </Descriptions.Item>

        <Descriptions.Item label="是否阳性">
          { value?.state == 1 ? '阳性' : '阴性' }
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};
export default ViewCovidResult;
