import { Layout, Menu } from 'antd';
import Link from 'next/link';

const { Sider } = Layout;
export default function SiderMenu() {
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
    }
  ];
  return (
    <Sider width={200} className={'site-layout-background'}>
      <Menu
        mode={'inline'}
        style={{ height: '100%', borderRight: 0 }}
      >
        {menuList.map(item => {
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
