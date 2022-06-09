import { request } from '../index';
import { MedicationItem } from '../doctor/consultation';
import { utimes } from 'fs';

type GetClinicsResponse = {
  msg : {clinic_id: number, name: string, description: string}[]
}

/** 查看所有科室信息 */
export async function getClinics() {
  return request<GetClinicsResponse>({
    url: '/api/patient/appointment/getClinics',
    method: 'GET'
  });
}

type GetClinicDoctorsResponse = {
  doctorInfo: {id: number, name: string}[]
}

/** 分科室查看下一周的出诊医生 */
export async function getClinicDoctors(clinicId: string) {
  return request<GetClinicDoctorsResponse>({
    url: `/api/patient/appointment/${clinicId}/doctors`,
    method: 'GET',
  });
}

type GetDoctorTimeSurplusResponse = {
  surplus: {
    id: number,
    visit_time: string,
    number_of_patient: number
  }[]
}

/** 查看某位医生下一周的出诊时间和余量 */
export function getDoctorTimeSurplus(doctorId: string) {
  return request<GetDoctorTimeSurplusResponse>({
    url: `/api/patient/appointment/${doctorId}/timeSurplus`,
    method: 'GET',
  });
}

/** 预约门诊 */
export function createAppointment(visitID: string) {
  return request<{}>({
    url: `/api/patient/appointment/${visitID}/makeApp`,
    method: 'POST'
  });
}

type GetAppointmentResponse = {
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

/** 获取预约 */
export function getAppointment() {
  return request<GetAppointmentResponse>({
    url: '/api/patient/info/getConsultationInfo',
    method: 'GET'
  });
}

export type ConsultationRecordType = {
  id: number
  patient_id: number
  visit_id: number
  create_time: string
  patient_description: null
  advice: null
  state: number
  doctor_id: number
  visit_time: string
  doctor_name: string
  clinic_id: number
  clinic_name: string
  clinic_desc: string
  medicines: MedicationItem[]
}

export type GetOneAppointmentResponse = {
  ConsultationRecord: ConsultationRecordType
}

/** 获取某一预约 */
export function getOneAppointment(consultationId: number) {
  return request<GetOneAppointmentResponse>({
    url: `/api/patient/info/${consultationId}/getOneConsultationInfo`,
    method: 'GET'
  });
}

/** 取消预约 */
export function cancelAppointment(consultationId: number) {
  return request<{}>({
    url: `/api/patient/info/${consultationId}/cancelConsultation`,
    method: 'POST'
  });
}
