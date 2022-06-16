import '../styles/globals.css';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import type { AppProps } from 'next/app';
import React from 'react';
import  { AuthContext, useAuth } from './context';
import PageHeader from './PageHeader';

const { Footer } = Layout;



function MyApp({ Component, pageProps }: AppProps) {

  const LoginValue = useAuth();
  
  return (
    <AuthContext.Provider value = {LoginValue} >
      <Layout>
        <PageHeader/>
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
          ZJU SE ©2022 Created
        </Footer>
      </Layout>
    </AuthContext.Provider>
  );
}

export default MyApp;

