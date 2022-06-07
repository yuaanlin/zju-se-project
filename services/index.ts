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
  const res = await fetch(API_URL + opt.url, {
    method: opt.method,
    body: JSON.stringify(opt.data),
    headers:{ 'Content-Type': 'application/json' }
  });
  return await res.json() as ResponseType<ResponsePayloadType> ;
}
