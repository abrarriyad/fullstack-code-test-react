import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { TokenContext } from "../context/TokenContext";
const Logout: React.FC = () => {
  const history = useHistory();
  const { setToken } = useContext(TokenContext);
  useEffect(() => {
    history.push("/login");
    setToken("");
  });

  return null;
};

export default Logout;
