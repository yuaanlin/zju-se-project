import { Info } from './info';
import { Identity } from '../login';
import { useEffect, useState } from 'react';

const Account = ()=>{
  const [identity, setIdentity] = useState<Identity>('');
  useEffect(()=>{
    const id_opt = localStorage.getItem('identity');
    const identity = id_opt?id_opt:'';
    setIdentity(identity);
  });
  if(''==identity)
    return <></>;
  else
    return <Info identity={identity}/>;
};
export default Account;
