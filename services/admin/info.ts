import { request } from '../index';

type Info = 
{   adminName             : string
,   phoneNumber           : string
,   emailAddress          : string
,   gender                : string
}

const getInfo = async ()=>{
    const res = await request<{userInfo:Info}>({
        method: 'GET'
    ,   url: "/api/admin/info/getInfo"
    })
    if(200==res.errorCode)
        return res.payload.userInfo
    else
        throw res
}

const updateInfo = async (info:Info)=> await request<{}>({
    method: 'POST'
,   url: "/api/admin/info/updateInfo"
,   data: info
})


export type { Info }

export { getInfo, updateInfo }
