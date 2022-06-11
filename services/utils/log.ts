import { request } from '../index';

//  登录/注册都是统一的格式
type LoginType = {
  id  : number,
  md5 : string  //  MD5(id + password)
}

type SingupType = {
  id  : number,
  md5 : string,
  name : string,
  personalID : string,
  gender : string,
  phone : string,
  email : string,
  medicalInsuranceID : string
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



/** 发送注册请求      三种身份合为一个函数, 对应的响应payload 为 {}  */
export async function createSignup(signupID: number, signupMD5: string, identity: string, signupName :string, signupPersonalID: string, signupGender : string, signupPhone : string, signupEmail : string, signupMedicalInsuranceID : string ) {
  return request<LogResponse>({
    url: `/api/${identity}/signup`,
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
