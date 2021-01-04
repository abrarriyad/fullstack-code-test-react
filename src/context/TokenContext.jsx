import React, { useState, createContext } from "react";

export const TokenContext = createContext({
  token: "",
  setToken: (token) => {},
  isLoggedIn: false,
});

export const TokenProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loginStatus, setLoginStatus] = useState(true);
  const changeToken = (token) => {
    setToken(token);
  };

  const changeLoginStatus = (status) => {
    setLoginStatus(status);
    // return loginStatus;
  };

  return (
    <TokenContext.Provider
      value={{
        token: token,
        setToken: changeToken,
        changeLoginStatus: changeLoginStatus,
        isLoggedIn: loginStatus,
      }}
    >
      {props.children}
    </TokenContext.Provider>
  );
};
