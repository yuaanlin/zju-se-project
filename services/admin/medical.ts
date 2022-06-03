import { request } from '../index';

type MedicationInfo = {
    name: string,
    category: string,
    instruction: string,
    contraindication: string,
    surplus: number
}

/** 管理员增加药品信息 */
export async function addMedication(medicationInfo: MedicationInfo) {
    return request<{}>({
        url: '/api/admin/medical/addMedication',
        method: 'POST',
        data: medicationInfo
    });
}

/** 管理员删除药品信息 */
export async function deleteMedication(medicationId: number) {
    return request<{}>({
        url: `/api/admin/medical/${medicationId}/deleteMedication`,
        method: 'POST'
    });
}

/** 管理员更新药品信息 */
export async function updateMedication(medicationId: number, medicationInfo: MedicationInfo) {
    return request<{}>({
        url: `/api/admin/medical/${medicationId}/updateMedication`,
        method: 'POST',
        data: medicationInfo
    });
}

type MedicationId = {
    medicationId: number
}

type GetMedicationResponse = {
    medicationInfo: (MedicationId & MedicationInfo)[]
}

/** 管理员查询药品信息 */
export async function getMedication(medicationId: number) {
    return request<GetMedicationResponse>({
        url: `/api/admin/medical/${medicationId}/getMedication`,
        method: 'GET'
    });
}