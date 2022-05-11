import { request } from '../index';

type GetClinicDoctorsResponse = {
  doctorInfo: {ID: number, name: string}[]
}

/** 分科室查看下一周的出诊医生 */
export async function getClinicDoctors(clinicId: string) {
  return request<GetClinicDoctorsResponse>({
    url: `/api/patient/appointment/${clinicId}/doctors`,
    method: 'GET',
  });
}

type GetDoctorTimeSurplusResponse = {
  title: string
  look: string
  desc: string
  visitID: string[]
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
  msg: {
    consultationID: string,
    clinic: string,
    docName: string,
    dateTime: string
  }[]
}

/** 获取预约 */
export function getAppointment(patientId: string) {
  return request<GetAppointmentResponse>({
    url: `/api/patient/appointment/${patientId}/listApp`,
    method: 'GET'
  });
}

type GetOneAppointmentResponse = {
  clinic: string
  docName: string
  docGender: string
  docTitle: string
  docPhone: string
  docEmail: string
  dateTime: string
  state: string
  patientDesc: string
  advice: string
}

/** 获取某一预约 */
export function getOneAppointment(consultationId: string) {
  return request<GetOneAppointmentResponse>({
    url: `/api/patient/appointment/${consultationId}/getApp`,
    method: 'GET'
  });
}

/** 取消预约 */
export function cancelAppointment(consultationId: string) {
  return request<{}>({
    url: `/api/patient/appointment/${consultationId}/cancelApp`,
    method: 'POST'
  });
}
