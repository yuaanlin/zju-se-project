import { API_URL } from '../config';

interface RequestOption {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  data?: any;
}

type ResponseType<ResponsePayloadType> = {
  errorCode: number
  errorMsg: string
  payload: ResponsePayloadType
}

export async function request<ResponsePayloadType>(opt: RequestOption) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  const tokenInLocalStorage = localStorage.getItem('token');
  if (tokenInLocalStorage)
    headers.append('Authorization', 'Bearer ' + tokenInLocalStorage);
  const res = await fetch(API_URL + opt.url, {
    headers,
    method: opt.method,
    body: JSON.stringify(opt.data),
    headers:{ 'Content-Type': 'application/json' }
  });
  return await res.json() as ResponseType<ResponsePayloadType>;
}
