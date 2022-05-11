import '../styles/globals.css';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import type { AppProps } from 'next/app';

const { Header, Footer } = Layout;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Header className={'header'}>
        <div className={'logo'} >
          <h1
            style={{ color:'#fff' }}
          >
            医用系统
          </h1>
        </div>
        <Menu theme={'dark'} mode={'horizontal'} />
      </Header>
      <Layout
        style={{
          padding:'24px 24px',
          minHeight: 700
        }}>
        <Component {...pageProps} />
      </Layout>
      <Footer
        style={{ textAlign: 'center' }}
      >
        ZJU SE ©2022 Created by xxx
      </Footer>
    </Layout>
  );
}

export default MyApp;

