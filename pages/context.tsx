import { createContext, useContext, useState } from "react";

export interface LoginContextData {
  login_done : boolean,
  setLogin : () => void,
  setLogout : () => void
}

const setDefault = () =>{

}

const LoginContextDataDefaultValue: LoginContextData = {
  login_done : false,
  setLogin : setDefault,
  setLogout : setDefault
};

export const AuthContext = createContext<LoginContextData>(LoginContextDataDefaultValue);

export function useAuth() :LoginContextData {
  const [login_done, setLoginDone] = useState(false);

  const setLogin = () => {
    setLoginDone(true);
  }

  const setLogout = () => {
    setLoginDone(false);
  }

  return {
    login_done,
    setLogin,
    setLogout,
  }
}

export default function ContextNothing() {
  return (
    <>
    </>
  )
}

// const AuthContextProvider = () => {
//   const [login_done, setLoginDone] = useState(false);

//   const setLogin = () => {
//     setLoginDone(true);
//   }

//   const setLogout = () => {
//     setLoginDone(false);
//   }


//   return (
//     <AuthContext.Provider value = { {setLogin, setLogout, login_done }}  >
//       {/* {props.children} */}
//     </AuthContext.Provider>
//   )
// }

// export const useAuth = () => useContext(AuthContext);
// export default AuthContextProvider;