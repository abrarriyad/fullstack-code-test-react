import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { TokenContext } from "../context/TokenContext";
const Logout = () => {
  const history = useHistory();
  const { setToken, changeLoginStatus } = useContext(TokenContext);
  useEffect(() => {
    history.push("/login");
    setToken("");
    changeLoginStatus(false);
  });

  return null;
};

export default Logout;
