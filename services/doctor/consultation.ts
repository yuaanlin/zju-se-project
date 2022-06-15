import { request } from '../index';

/** 医生接诊，将对应的问诊状态由 未完成 改为 进行中 */
export async function treatPatient(consultationId: number) {
  return request<{}>({
    url: `/api/doctor/consultation/${consultationId}/treatPatitent`,
    method: 'POST',
  });
}

export type MedicationItem = {
  medicationID: number;
  medicationCnt: number;
}
type FinishConsultationBody = {
  advice: string;
  medications: MedicationItem[]
}
/** 医生接诊，将对应的问诊状态由 进行中 改为 已完成 */
export async function finishConsultation(consultationId: number, body: FinishConsultationBody) {
  return request<{}>({
    url: `/api/doctor/consultation/${consultationId}/finishConsultation`,
    method: 'POST',
    data: body
  });
}

type GetActiveConsultationResponse = {
  activeConsultations: number[]
}

/** 获取与某医生有关的活跃状态（未完成 & 进行中）的问诊 */
export async function getActiveConsultations() {
  return request<GetActiveConsultationResponse>({
    url: '/api/doctor/consultation/getActiveConsultation',
    method: 'GET',
  });
}

type GetFinishedConsultationsResponse = {
  finishedConsultations: number[]
}

/** 获取与某医生有关的已结束的问诊 */
export async function getFinishedConsultations() {
  return request<GetFinishedConsultationsResponse>({
    url: '/api/doctor/consultation/getFinishedConsultation',
    method: 'GET',
  });
}

type GetAllConsultationResponse = {
  consultationInfo: {
    id: number,
    patient_id: number,
    patient_description:string,
    advice: string,
    state: number,
    doctor_id: number,
    doctor_name: string,
    clinic_id: string,
    clinic_name: string,
    clinic_desc: string,
    create_time: string,
    visit_id: number,
    visit_time: string,
    // date: string
  }[]
}

/** 获取与某医生有关的全部问诊 */
export async function getAllConsultation() {
  return request<GetAllConsultationResponse>({
    url: '/api/doctor/consultation/getAllConsultation',
    method: 'GET',
  });
}

type GetConsultationInfoResponse = {
  id: number
  doctorID: number
  patientID: number
  createTime: number
  patientDescription: string
  advice: string
}

/** 获取对应问诊的详细信息 */
export async function getConsultationInfo(consultationId: string) {
  return request<GetConsultationInfoResponse>({
    url: `/api/doctor/consultation/${consultationId}/getConsultationInfo`,
    method: 'GET',
  });
}

type GetMedicationInfoResponse = {
  medicationInfo: {
    medication_id: number,
    medication_name: string,
    category: string,
    instruction: string,
    contraindication: string,
    surplus: number
  }[]
}

/** 获取药物列表 */
export async function getAllMedicationInfo() {
  return request<GetMedicationInfoResponse>({
    url: '/api/doctor/medical/getAllMedication',
    method: 'GET',
  });
}
