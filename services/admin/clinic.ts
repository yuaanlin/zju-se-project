import { request } from '../index';

/** 管理员新增科室 */
export function createClinic(name: string, description: string) {
  return request<{}>({
    url: '/api/admin/addClinic',
    method: 'POST',
    data: {
      name,
      description
    }
  });
}

/** 管理员删除科室 */
export function deleteClinic(clinicId: number) {
  return request<{}>({
    url: `/api/admin/${clinicId}/delClinic`,
    method: 'POST'
  });
}

/** 管理员修改科室信息 */
export function updateClinic(
  clinicId: number,
  name: string,
  description: string
) {
  return request<{}>({
    url: `/api/admin/${clinicId}/updateClinic`,
    method: 'POST',
    data: {
      name,
      desc: description
    }
  });
}
