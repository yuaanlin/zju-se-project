import SiderMenu from '../component/SiderMenu';
import { Layout } from 'antd';
const { Content } = Layout;

import { Info} from './info';
import { useEffect, useState } from 'react';
import { Identity } from '../login';
import * as patient from '../../services/patient/info';

const Account = ()=>{
  const [identity, setIdentity] = useState<Identity>('')
    useEffect(()=>{
      const id_opt = localStorage.getItem("identity")
      const identity = id_opt?id_opt:''
      setIdentity(identity)
    })
    if(''==identity)
      return <></>
    else 
      return <Info identity={identity}/>
}
export default Account