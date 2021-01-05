import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { TokenContext } from "../context/TokenContext";
const Logout: React.FC = () => {
  const history = useHistory();
  const { setToken } = useContext(TokenContext);
  useEffect(() => {
    console.group("User Logout");
    console.info("Logging out...");
    setToken("");
    console.info("Token destroyed");
    console.info("Logout Successfull");
    console.info("Redirecting to Login page...");
    console.groupEnd();
    history.push("/login");
  });

  return null;
};

export default Logout;
