import { request } from '../index';

export type VisitType = {
  id: number,
  doctor_id: number,
  visit_time: string,
  number_of_patients: string
}
type getVisitType = {
  msg: VisitType[]
}
/** 管理员新增科室 */
export function getVisits() {
  return request<getVisitType>({
    url: '/api/admin/listVisit',
    method: 'GET',
  });
}

/** 管理员新增科室 */
export function createVisit(doctorId: number, visitTime: string) {
  return request<{}>({
    url: '/api/admin/addVisit',
    method: 'POST',
    data: { doctorID: doctorId, visitTime: visitTime }
  });
}

/** 管理员删除科室 */
export function deleteVisit(visitId: number) {
  return request<{}>({
    url: `/api/admin/${visitId}/delVisit`,
    method: 'POST'
  });
}

