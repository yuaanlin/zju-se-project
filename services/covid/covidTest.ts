import exp from 'constants';
import { type } from 'os';
import internal from 'stream';
import { request } from '../index';

// type GetConsultationInfoResponse = {
//     id: number
//     doctorID: number
//     patientID: number
//     createTime: number
//     patientDescription: string
//     advice: string
//   }
  
//   /** 获取对应问诊的详细信息 */
//   export async function getConsultationInfo(consultationId: string) {
//     return request<GetConsultationInfoResponse>({
//       url: `/api/doctor/consultation/${consultationId}/getConsultationInfo`,
//       method: 'GET',
//     });
//   }

//patient related
//
//

//1-4-1
//患者查询自己最近一次核酸检测的状态
export type GetLatestCovidResultResponse = {
    reportTime: string
    state: number
}

export async function getLatestCovidResultResponse(){
    return request<GetLatestCovidResultResponse>({
        url:'/api/patient/nat/getState',
        method:'GET',
    });
}

//1-4-2
//患者去预约核酸检测
export async function postCovidAppoitment() {
    return request<{}>({
        url:'/api/patient/nat/resNAT',
        method:'POST',
    })
}

//doctor related
//
export async function postCovidResult(covidTestId: number,ifPositive:number) {
    return request<{}>({
        url:'/api/doctor/nat/reportNAT',
        method:'POST',
        data:{
            nat_id :covidTestId,
            state : ifPositive
        },
    })
}


