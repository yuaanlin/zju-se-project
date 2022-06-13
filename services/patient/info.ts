import { request } from '../index';

type Info = 
{   id                    : number
,   name                  : string
,   personaID             : number
,   gender                : string
,   phone                 : string
,   email                 : string
,   medical_insuranceID   : string
}

const getInfo = async ()=>{
    const res = await request<{userInfo:Info}>({
        method: 'POST'
    ,   url: "/api/patient/info/getInfo"
    ,   data: {}
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
