import { request } from '../index';

type GetMedicationResponse = {
  medication_id: number;
  name: string;
  instruction: string;
  category: string;
  contraindication: string;
  surplus: number;
};

/** 医生查询药品 */
export async function getMedication(medicationId: number) {
  return request<GetMedicationResponse>({
    url: `/api/doctor/medical/${medicationId}/getMedication`,
    method: 'GET',
  });
}

type GetAllMedicationResponse = {
  medicationInfo: {
    medicationID: number;
    name: string;
    category: string;
    instruction: string;
    contraindication: string;
    surplus: number;
  }[];
};

/** 医生查询全部药品 */
export async function getAllMedication() {
  return request<GetAllMedicationResponse>({
    url: '/api/doctor/medical/getAllMedication',
    method: 'GET',
  });
}

type PrescribeMedicationBody = {
  medicationID: number;
  num: number;
};

/** 医生开药 */
export async function prescribeMedication(
  consultationId: number,
  body: PrescribeMedicationBody
) {
  return request<{}>({
    url: `/api/doctor/medical/${consultationId}/prescribeMedication`,
    method: 'POST',
    data: body,
  });
}
