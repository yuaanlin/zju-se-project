import SiderMenu from '../component/SiderMenu';
import { Button, Form, Space, Table, Tag } from 'antd';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import Image from './Image'
import Icon from '@ant-design/icons';
import logo from './medicineIcon.svg';
import styles from '../../styles/Home.module.css';
import Link from 'next/link';
//import MessageSvg from 'path/to/message.svg';

export default function MedicinePage() {
  return (
    <Layout>
      <Sider style={{
            background: '#fff',
            padding: 24,
            margin: 0,
            minHeight: 480,
          }}><SiderMenu /></Sider>

      <Layout>
        <Header style={{
            background: '#fff',
            padding: 24,
          }}><h1>药物平台</h1></Header>
        <Content 
          className="site-layout-background"
          style={{
            background: '#fff',
            padding: 24,
            margin: 0,
            minHeight: 480,
          }}>
           <Layout>
            <Content>Where to place the list</Content>
           <Sider style={{
            background: '#fff',
            padding: 24,
            margin: 0,
            minHeight: 480,
          }}><Image /></Sider>
           </Layout>
          </Content>
        <Footer>
          <div>medicine system</div>
          <div>developed by Group3</div>
        </Footer>
      </Layout>

    </Layout>
  );
}
