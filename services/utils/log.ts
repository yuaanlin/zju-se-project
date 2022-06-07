import { request } from '../index';

//  登录/注册都是统一的格式
type LoginType = {
  id  : string,
  md5 : string  //  MD5(id + password)
}

/** 发送登录请求      三种身份合为一个函数, 对应的响应payload 为 {}  */
export async function createLogin(loginID: string, loginMD5: string, identity: string) {
  return request<{}>({
    url: `/api/${identity}/login`,
    method: 'POST',
    data : {
      id : loginID,
      md5 : loginMD5
    }
  });
}


// /** 获取登录返回 */
// export async function getLoginResponse(identity: string) {
//   return request<{}>({
//     url: `/api/${identity}/login`,
//     method: 'GET',
//   });
// }


/** 发送注册请求      三种身份合为一个函数, 对应的响应payload 为 {}  */
export async function createSignup(signupID: string, signupMD5: string, identity: string) {
  return request<{}>({
    url: `/api/${identity}/signup`,
    method: 'POST',
    data : {
      id : signupID,
      md5 : signupMD5
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
