import '../styles/globals.css';
import 'antd/dist/antd.css';
import PageHeader from './PageHeader';
import { Layout } from 'antd';
import React, { createContext, useContext, useState } from 'react';
import type { AppProps } from 'next/app';

const { Footer } = Layout;

/*  AuthContext & Provider  */
export interface LoginContextData {
  login_done : boolean,
  setLogin : () => void,
  setLogout : () => void
}
const setDefault = () =>{

};

const LoginContextDataDefaultValue: LoginContextData = {
  login_done : false,
  setLogin : setDefault,
  setLogout : setDefault
};

export const AuthContext = createContext<LoginContextData>(LoginContextDataDefaultValue);

export function useAuth() {
  return useContext(AuthContext);
}

function MyApp({ Component, pageProps }: AppProps) {

  const [login_done, setLoginDone] = useState(false);
  const setLogin = () => {
    setLoginDone(true);
  };

  const setLogout = () => {
    setLoginDone(false);
  };

  return (
    <AuthContext.Provider value = {{ login_done, setLogin, setLogout }} >
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

