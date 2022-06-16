import { Layout, Menu } from 'antd';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const { Sider } = Layout;
export default function SiderMenu() {
  const [identity, setIdentity] = useState<string|null>('');
  useEffect(() => {
    let i = localStorage.getItem('identity');
    setIdentity(i);
  }, []);
  const adminList = [3, 4, 5, 6];
  const patientList = [0, 1, 2];
  const doctorList = [0, 1, 2];
  const menuList: { key: string; url: string }[] = [
    {
      key: 'Appointment 预约',
      url: '/appointment'
    },
    {
      key: 'Information 个人信息',
      url: '/account'
    },
    {
      key: 'Covid-19-appointment 核酸检测预约 ',
      url: '/covid-19-testing'
    },
    {
      key: 'Medicine 药物系统',
      url: '/medicine'
    },
    {
      key: 'Clinic 科室管理',
      url: '/clinic'
    },
    {
      key: 'Doctor 医生管理',
      url: '/doctor'
    },
    {
      key: 'Visit 医生问诊管理',
      url: '/visit'
    }
  ];
  return (
    <Sider width={200} className={'site-layout-background'}>
      <Menu
        mode={'inline'}
        style={{ height: '100%', borderRight: 0 }}
      >
        {menuList
          .filter((x, idx) => {
            if (identity === 'admin'){
              return adminList.includes(idx);
            } else if (identity === 'patient'){
              return patientList.includes(idx);
            } else if (identity === 'doctor'){
              return doctorList.includes(idx);
            } else {
              return false;
            }
          })
          .map(item => {
            if(item) {
              return (
                <Menu.Item key={item.key}>
                  <Link href={item.url}><a>{item.key}</a></Link>
                </Menu.Item>
              );
            }
          })}
      </Menu>
    </Sider>
  );
}
