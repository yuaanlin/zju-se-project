import { createContext, useContext, useState } from "react";


const AuthContext = createContext({});

const AuthContextProvider = (props) => {
  const [login_done, setLoginDone] = useState(false);

  const setLogin = () => {
    setLoginDone(true);
  }

  const setLogout = () => {
    setLoginDone(false);
  }


  return (
    <AuthContext.Provider value = { {setLogin, setLogout, login_done }}  >
      {props.children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);
export default AuthContextProvider;