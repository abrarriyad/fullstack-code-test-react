import React, { useState, createContext } from "react";

export const TokenContext = createContext({
  token: "",
  setToken: (token: string) => {},
  isLoggedIn: false,
});

export const TokenProvider: React.FC = (props) => {
  const [token, setToken] = useState<any>(localStorage.getItem("token"));
  const [loginStatus, setLoginStatus] = useState<boolean>(true);
  const changeToken = (token: string) => {
    setToken(token);
  };

  return (
    <TokenContext.Provider
      value={{
        token: token,
        setToken: changeToken,
        isLoggedIn: loginStatus,
      }}
    >
      {props.children}
    </TokenContext.Provider>
  );
};
