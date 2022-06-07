import { request } from '../index';

type MedicationInfo = {
    name: string,
    category: string,
    instruction: string,
    contraindication: string,
    surplus: number
}

export type AddMedicationBody = MedicationInfo

/** 管理员增加药品 */
export async function addMedication(body: AddMedicationBody) {
    console.log('add medication: ', body);
    return request<{}>({
        url: '/api/admin/medical/addMedication',
        method: 'POST',
        data: body
    });
}

/** 管理员删除药品 */
export async function deleteMedication(medicationId: number) {
    return request<{}>({
        url: `/api/admin/medical/${medicationId}/deleteMedication`,
        method: 'POST'
    });
}

export type UpdateMedicationBody = MedicationInfo;

/** 管理员更新药品信息 */
export async function updateMedication(medicationId: number, body: UpdateMedicationBody) {
    return request<{}>({
        url: `/api/admin/medical/${medicationId}/updateMedication`,
        method: 'POST',
        data: body
    });
}

export type GetMedicationResponse = {
    medication_id: number
} & MedicationInfo

/** 管理员查询药品 */
export async function getMedication(medicationId: number) {
    return request<GetMedicationResponse>({
        url: `/api/admin/medical/${medicationId}/getMedication`,
        method: 'GET'
    });
}

type GetAllMedicationResponse = {
    medicationInfo: GetMedicationResponse[]
}

/** 管理员查询全部药品 */
export async function getAllMedication() {
    return request<GetAllMedicationResponse>({
        url: '/api/admin/medical/getAllMedication',
        method: 'GET'
    });
}