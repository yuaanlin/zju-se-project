import { request } from '../index';

type Info =
{
    name : string,
    avater : string,
    clinicID : string,
    gender : string,
    title : string,
    phone : string,
    email : string,
    description : string,
    visitTime : {
        doctorID : number,
        visit_time : string,
        number_of_patients : number
    }[]
}

const getInfo = async ()=>{
    const res = await request<{userInfo:Info}>({
        method: 'GET',
        url: "/api/doctor/info/getInfo"
    })
    if(200==res.errorCode)
        return res.payload.userInfo
    else
        throw res
}

const updateInfo = async (info:Info)=> await request<{}>({
  method: 'POST',
  url: '/api/doctor/info/updateInfo',
  data: info
});

export type { Info };

export { getInfo, updateInfo };
