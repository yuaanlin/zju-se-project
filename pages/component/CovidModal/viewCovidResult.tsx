import {
    GetLatestCovidResultResponse,
    getLatestCovidResultResponse
} from '../../../services/covid/covidTest';
import { getVisitTime } from '../AppointmentModal/addAppointmentForm';
import React, { useEffect, useState } from 'react';
import { Input, Form, FormInstance, message, Select, Button, Descriptions } from 'antd';
import { ArrowsAltOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

interface ViewCovidResultFormProps {
    form: FormInstance;
  }
const ViewCovidResult: React.FC<ViewCovidResultFormProps>=(
    {form}
)=>{
    const[value,setValue] = useState<GetLatestCovidResultResponse>();
    const getCovidResultInfo = async()=>{
        let res = await getLatestCovidResultResponse();
        if(res.errorCode!=200){
            console.log(res.errorMsg);
            message.error(res.errorMsg);
            return;
        }
        let currentResult = res.payload;
        if(currentResult.reportTime == undefined){
            currentResult.reportTime = '暂未出结果';
        }else{
            currentResult.reportTime = getVisitTime(currentResult.reportTime);
        }
        
        form.setFieldsValue(currentResult);
        setValue(currentResult);
    };
    useEffect(()=>{
        getCovidResultInfo();
    },[]);

    //if (!value)
    return(
        <div>
            <Descriptions>
            {
                value?.reportTime=='暂未出结果'?
                    <Descriptions.Item label="报告状态">{'未出具'}</Descriptions.Item>
                :
                null
            }
            {
                value?.reportTime=='暂未出结果'?
                null 
                :
                <Descriptions.Item label="报告状态">{'已出具'}</Descriptions.Item>
            }   
            {
                value?.reportTime=='暂未出结果'?
                    <Descriptions.Item label="报告时间">{'NULL'}</Descriptions.Item>
                :
                null
            }
            {
                value?.reportTime=='暂未出结果'?
                null 
                :
                <Descriptions.Item label="报告时间">{value?.reportTime}</Descriptions.Item>
            }
            <Descriptions.Item label="是否阳性">{value?.state==1?'阳性':'阴性'}</Descriptions.Item>
            </Descriptions>
        </div>
    );
}
export default ViewCovidResult;