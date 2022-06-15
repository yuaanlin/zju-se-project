import { request } from '../index';

type Info = 
{   id                    : number
,   name                  : string
,   personalID             : number
,   gender                : string
,   phone                 : string
,   email                 : string
,   medicalInsuranceID   : string
}

const getInfo = async ()=>{
    const res = await request<{userInfo:Info}>({
        method: 'GET'
    ,   url: "/api/patient/info/getInfo"
    })
    if(200==res.errorCode)
        return res.payload.userInfo
    else
        throw res
}

const updateInfo = async (info:Info)=> await request<{}>({
    method: 'POST'
,   url: "/api/patient/info/updateInfo"
,   data: info
})


export type { Info }

export { getInfo, updateInfo }
