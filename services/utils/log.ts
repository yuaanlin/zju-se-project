import { request } from '../index';

//  登录/注册都是统一的格式
type LoginType = {
  id  : number,
  md5 : string  //  MD5(id + password)
}

type PatientSingupType = {
  id  : number,
  md5 : string,
  name : string,
  personalID : string,
  gender : string,
  phone : string,
  email : string,
  medicalInsuranceID : string
}


type DoctorSignupType = {
  id  : number,
  md5 : string,
  acatar : string,  //  Base64
  name : string,
  cliniclID : number,
  gender : string,
  title : string,
  phone : string,
  email : string,
  description : string
}


type LogResponse = {
  token : string
}

/** 发送登录请求      三种身份合为一个函数, 对应的响应payload 为 {}  */
export async function createLogin(loginID: number, loginMD5: string, identity: string) {
  return request<LogResponse>({
    url: `/api/${identity}/login`,
    method: 'POST',
    data : {
      id : loginID,
      md5 : loginMD5
    }
  });
}



/** 发送注册请求      医生注册  */
export async function createDoctorSignup(signupID: number, signupMD5: string,  signupName :string, signupClinicID: number, signupGender : string,  signupTitle : string, signupPhone : string, signupEmail : string, signupDescription : string ) {
  return request<LogResponse>({
    url: `/api/doctor/signup`,
    method: 'POST',
    data : {

      id  : signupID,
      md5 : signupMD5,
      acatar :  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPcAAAD3CAIAAABO7lUEAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAEXRFWHRTb2Z0d2FyZQBTbmlwYXN0ZV0Xzt0AAAKnSURBVHic7dJBDQAgEMAwwL/nQwUhWVoFe2zPzIK08zsAnnM5fS6nz+X0uZw+l9PncvpcTp/L6XM5fS6nz+X0uZw+l9PncvpcTp/L6XM5fS6nz+X0uZw+l9PncvpcTp/L6XM5fS6nz+X0uZw+l9PncvpcTp/L6XM5fS6nz+X0uZw+l9PncvpcTp/L6XM5fS6nz+X0uZw+l9PncvpcTp/L6XM5fS6nz+X0uZw+l9PncvpcTp/L6XM5fS6nz+X0uZw+l9PncvpcTp/L6XM5fS6nz+X0uZw+l9PncvpcTp/L6XM5fS6nz+X0uZw+l9PncvpcTp/L6XM5fS6nz+X0uZw+l9PncvpcTp/L6XM5fS6nz+X0uZw+l9PncvpcTp/L6XM5fS6nz+X0uZw+l9PncvpcTp/L6XM5fS6nz+X0uZw+l9PncvpcTp/L6XM5fS6nz+X0uZw+l9PncvpcTp/L6XM5fS6nz+X0uZw+l9PncvpcTp/L6XM5fS6nz+X0uZw+l9PncvpcTp/L6XM5fS6nz+X0uZw+l9PncvpcTp/L6XM5fS6nz+X0uZw+l9PncvpcTp/L6XM5fS6nz+X0uZw+l9PncvpcTp/L6XM5fS6nz+X0uZw+l9PncvpcTp/L6XM5fS6nz+X0uZw+l9PncvpcTp/L6XM5fS6nz+X0uZw+l9PncvpcTp/L6XM5fS6nz+X0uZw+l9PncvpcTp/L6XM5fS6nz+X0uZw+l9PncvpcTp/L6XM5fS6nz+X0uZw+l9PncvpcTp/L6XM5fS6nz+X0uZw+l9PncvpcTp/L6XM5fS6nz+X0uZw+l9PncvpcTp/L6XM5fS6nz+X0uZw+l9PncvpcTp/L6XM5fS6nz+X0uZw+l9PncvpcTp/L6XM5fS6nz+X0uZw+l9N3AYT3BOuIXLJlAAAAAElFTkSuQmCC",//  default string  
      name : signupName,
      cliniclID : signupClinicID,
      gender : signupGender,
      title : signupTitle,
      phone : signupPhone,
      email : signupEmail,
      description : signupDescription

    }
  });
}


/** 发送注册请求      病人注册  */
export async function createPatientSignup(signupID: number, signupMD5: string,  signupName :string, signupPersonalID: string, signupGender : string, signupPhone : string, signupEmail : string, signupMedicalInsuranceID : string ) {
  return request<LogResponse>({
    url: `/api/patient/signup`,
    method: 'POST',
    data : {
      id : signupID,
      md5 : signupMD5,
      name : signupName,
      personalID : signupPersonalID,
      gender : signupGender,
      phone : signupPhone,
      email : signupEmail,
      medicalInsuranceID : signupMedicalInsuranceID
    }
  });
}



/** 发送退出请求  三种身份合为一个函数, 对应的响应payload 为 {}  */
export async function createLogout(identity: string) {
  console.log(identity);
  return request<{}>({
    url: `/api/${identity}/logout`,
    method: 'POST',
    data : { }
    // 上面的一行是写? 还是忽略
  });
}
