import axios from "axios";
import { TokenContext } from "../context/TokenContext";
import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { User } from "../context/ServiceContext";
const Login = () => {
  const [isSuccess, setIsSuccess] = useState<boolean>(true);
  const { token, setToken } = useContext(TokenContext);

  const [user, setUser] = useState<User>({
    username: "",
    password: "",
  });

  const history = useHistory();

  const handleUsername = (event: { target: HTMLInputElement }) => {
    const val = event.target.value;
    setUser({
      username: val,
      password: user.password,
    });
  };

  const handlePassword = (event: { target: HTMLInputElement }) => {
    const val = event.target.value;
    setUser({
      username: user.username,
      password: val,
    });
  };

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  const login = () => {
    axios
      .post("/login", user)
      .then((response) => {
        setIsSuccess(true);
        setToken(response.data);
        history.push("/services");
      })
      .catch((error) => {
        setIsSuccess(false);
        console.log(error);
      });
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-content">
          <h1 className="title">Login</h1>
          <div className="field">
            <div className="control has-icons-left">
              <input
                className="input is-primary"
                type="text"
                placeholder="username"
                value={user.username}
                onChange={handleUsername}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
            </div>
          </div>

          <div className="field">
            <div className="control has-icons-left">
              <input
                className="input is-primary"
                type="password"
                placeholder="password"
                value={user.password}
                onChange={handlePassword}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-key"></i>
              </span>
            </div>
          </div>
          {!isSuccess && (
            <article className="message is-danger">
              <div className="message-header">
                <p>Login Failed</p>
                <button className="delete" aria-label="delete"></button>
              </div>
              {/* <div className="message-body">{{ errorMsg }}</div> */}
            </article>
          )}
          <div className="field is-grouped">
            <div className="control">
              <button onClick={login} className="button is-success">
                Login
              </button>
            </div>
            <div className="control">
              <button className="button is-link is-light">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
