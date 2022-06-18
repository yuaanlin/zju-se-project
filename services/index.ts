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
  const headers: { [key: string]: string } = {};
  headers['Content-Type'] = 'application/json';
  const tokenInLocalStorage = localStorage.getItem('token');
  if (tokenInLocalStorage)
    headers['Authorization'] = 'Bearer ' + tokenInLocalStorage;
  const res = await fetch(opt.url, {
    headers,
    method: opt.method,
    body: JSON.stringify(opt.data),
  });
  return await res.json() as ResponseType<ResponsePayloadType>;
}
