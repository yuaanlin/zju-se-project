import { request } from '../index';

export type DoctorType = {
  id: number,
  avatar: undefined | string,
  name: string,
  clinic: string,
  gender: 'M' | 'F',
  title: string,
  phone: string,
  email: string,
  description: string
}
/** 管理员新增医生 */
export function createDoctor(param: DoctorType) {
  return request<{}>({
    url: '/api/admin/addDoctor',
    method: 'POST',
    data: JSON.stringify(param)
  });
}

type GetDoctorsResponse = {
  msg : DoctorType[]
}

/** 管理员查询医生列表 */
export async function getDoctors() {
  return request<GetDoctorsResponse>({
    url: '/api/admin/listDoctor',
    method: 'GET'
  });
}

/** 管理员删除医生 */
export function deleteDoctor(doctorId: number) {
  return request<{}>({
    url: `/api/admin/${doctorId}/delDoctor`,
    method: 'POST'
  });
}

/** 管理员更新医生 */
export function updateDoctor(param: DoctorType) {
  return request<{}>({
    url: '/api/admin/updateDoctor',
    method: 'POST',
    data: JSON.stringify(param)
  });
}
