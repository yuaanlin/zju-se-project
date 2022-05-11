import SiderMenu from '../component/SiderMenu';
import { Layout } from 'antd';

const { Content } = Layout;
export default function Covid19TestingPage() {
  return (
    <>
      <SiderMenu />
      <Content
        className="site-layout-background"
        style={{
          background: '#fff',
          padding: 24,
          margin: 0,
          minHeight: 480,
        }}
      >
        <div>
          <h1>新冠检测平台</h1>
          <p>
            在 <code>pages/covid-19-testing</code> 目录下添加 <code>.tsx</code> 文件，
            即可在这个模块的路由下添加需要的二级路由。
          </p>
        </div>
      </Content>
    </>
  );
}
