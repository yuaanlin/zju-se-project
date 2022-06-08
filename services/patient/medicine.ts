import { request } from '../index';

type GetMedicalInfoResponse = {
  name: string;
  category: string;
  instruction: string;
  contraindication: string;
  medicationCnt: number;
}[];

/** 患者查看某次问诊的相应药品信息 */
export async function getMedicalInfo(consultationId: number) {
  return request<GetMedicalInfoResponse>({
    url: `/api/patient/medical/${consultationId}/getMedicalInfo`,
    method: 'GET',
  });
}
